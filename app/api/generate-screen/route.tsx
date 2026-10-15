import { db } from "@/config";
import { gemini } from "@/config/gemini";
import { GENERATION_SYSTEM_PROMPT } from "@/config/prompts";
import { screenConfigTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const MODEL = "gemini-3.5-flash-lite";
const MAX_TOKENS = 65536;
const MAX_ATTEMPTS = 3;

const stripFences = (raw: string) =>
  raw
    .replace(/^```html\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

const findProblem = (code: string): string | null => {
  const openDivs = (code.match(/<div[\s>]/gi) ?? []).length;
  const closeDivs = (code.match(/<\/div\s*>/gi) ?? []).length;
  const endsCleanly = /<\/[a-z][\w-]*\s*>$/i.test(code);
  const tooShort = code.length < 300;

  if (tooShort) return `too short (${code.length} chars)`;
  if (openDivs === 0) return "no <div> found";
  if (openDivs !== closeDivs) return `unbalanced divs ${openDivs}/${closeDivs}`;
  if (!endsCleanly) return "does not end with a closing tag";
  if (/<\/?[a-z][^>]*$/i.test(code)) return "ends mid-tag";
  return null;
};

type Attempt =
  | { ok: true; code: string; finishReason: string | null }
  | { ok: false; type: string; detail: string };

const getGeminiErrorInfo = (error: unknown) => ({
  message:
    error instanceof Error ? error.message : "Unknown Gemini API error",
  status:
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
      ? error.status
      : null,
});

const generateAttempt = async (
  userInput: string,
  retryFeedback?: string,
): Promise<Attempt> => {
  const aiResult = await gemini.models.generateContent({
    model: MODEL,
    contents: retryFeedback
      ? `${userInput}\n\nRETRY REQUIREMENT: Your previous HTML was incomplete (${retryFeedback}). Regenerate the entire screen from the beginning as compact, valid HTML. Keep the requested core layout and content, but simplify decorative details and close every opened element. Do not continue or explain the previous response.`
      : userInput,
    config: {
      systemInstruction: GENERATION_SYSTEM_PROMPT,
      maxOutputTokens: MAX_TOKENS,
    },
  });

  const finishReason =
    aiResult.candidates?.[0]?.finishReason?.toString() ?? null;
  const rawCode = aiResult.text;

  if (!rawCode || typeof rawCode !== "string") {
    return {
      ok: false,
      type: "EMPTY_AI_RESPONSE",
      detail: `finishReason=${finishReason}`,
    };
  }

  const code = stripFences(rawCode);
  const problem = findProblem(code);

  if (problem) {
    return {
      ok: false,
      type: "TRUNCATED_AI_RESPONSE",
      detail: `${problem}; finishReason=${finishReason}; len=${code.length}; tail=${JSON.stringify(code.slice(-80))}`,
    };
  }

  return { ok: true, code, finishReason };
};

export async function POST(req: NextRequest) {
  const {
    projectId,
    screenId,
    screenName,
    purpose,
    screenDescription,
    projectVisualDescription,
    theme,
  } = await req.json();

  const userInput = `screen name: ${screenName},
purpose (max 12 words): ${purpose},
layout: ${screenDescription}${
    projectVisualDescription
      ? `,\nvisual direction: ${projectVisualDescription}`
      : ""
  }${theme ? `,\ntheme name: ${theme} (use parent CSS vars, do not redeclare)` : ""}`;

  let lastFailure: Extract<Attempt, { ok: false }> | null = null;
  let retryFeedback: string | undefined;

  try {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      let result: Attempt;
      try {
        result = await generateAttempt(userInput, retryFeedback);
      } catch (error) {
        const geminiError = getGeminiErrorInfo(error);
        console.error(
          `generate-screen Gemini request failed for ${screenId}:`,
          geminiError,
        );
        return NextResponse.json(
          {
            error:
              geminiError.status === 429
                ? "Gemini is rate limiting requests. Please wait and retry."
                : geminiError.status === 401 || geminiError.status === 403
                  ? "Gemini rejected the API key or request. Check GEMINI_API_KEY configuration."
                  : "Gemini could not complete this request.",
            type: "GEMINI_API_ERROR",
            detail: geminiError.message.slice(0, 300),
            statusCode: geminiError.status,
          },
          { status: 502 },
        );
      }

      if (result.ok) {
        const updatedResult = await db
          .update(screenConfigTable)
          .set({
            code: result.code,
          })
          .where(
            and(
              eq(screenConfigTable.projectId, projectId),
              eq(screenConfigTable.screenId, screenId as string),
            ),
          )
          .returning();

        return NextResponse.json(updatedResult[0]);
      }

      lastFailure = result;
      retryFeedback = result.detail;
      console.error(
        `generate-screen attempt ${attempt}/${MAX_ATTEMPTS} failed for ${screenId}: [${result.type}] ${result.detail}`,
      );
    }

    return NextResponse.json(
      {
        error:
          lastFailure?.type === "TRUNCATED_AI_RESPONSE"
            ? "AI returned incomplete HTML. Please retry."
            : "AI returned an unusable response. Please retry.",
        type: lastFailure?.type ?? "GENERATION_FAILED",
        detail: lastFailure?.detail,
      },
      { status: 502 },
    );
  } catch (error) {
    console.error(
      `generate-screen error for ${screenId}:`,
      error instanceof Error ? error.message : error,
    );

    return NextResponse.json(
      {
        error: "Failed to save the generated screen. Please retry.",
        type: "GENERATE_SCREEN_ERROR",
      },
      { status: 500 },
    );
  }
}
