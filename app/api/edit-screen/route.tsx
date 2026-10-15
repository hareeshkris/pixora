import { db } from "@/config";
import { gemini } from "@/config/gemini";
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

const getProviderErrorInfo = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : "Unknown provider error";
  const statusCode = (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof error.statusCode === "number"
      ? error.statusCode
      : typeof error === "object" &&
          error !== null &&
          "status" in error &&
          typeof error.status === "number"
        ? error.status
        : null
  );

  return { message, statusCode };
};

const generateAttempt = async (
  userInput: string,
  retryFeedback?: string,
): Promise<Attempt> => {
  const aiResult = await gemini.models.generateContent({
    model: MODEL,
    contents: retryFeedback
      ? `${userInput}\n\nRETRY REQUIREMENT: Your previous HTML was incomplete (${retryFeedback}). Output the ENTIRE updated screen from the beginning as complete, valid HTML. Keep the requested change and core layout, but simplify decorative details and close every opened element. Do not continue or explain the previous response.`
      : userInput,
    config: {
      maxOutputTokens: MAX_TOKENS,
    },
  });

  const rawCode = aiResult.text;
  const finishReason =
    aiResult.candidates?.[0]?.finishReason?.toString() ?? null;

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
  const { projectId, screenId, oldCode, userInput } = await req.json();

  const USER_INPUT = `${oldCode} Make changes as per user input. Change styles as per user requested. just make user requested change, the user input is ${userInput} `;
  let lastFailure: Extract<Attempt, { ok: false }> | null = null;
  let retryFeedback: string | undefined;

  try {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      let result: Attempt;
      try {
        result = await generateAttempt(USER_INPUT, retryFeedback);
      } catch (error) {
        const providerError = getProviderErrorInfo(error);
        console.error(
          `edit-screen Gemini request failed for ${screenId}:`,
          providerError,
        );

        return NextResponse.json(
          {
            error:
              providerError.statusCode === 429
                ? "Gemini is rate limiting requests. Please wait a moment and retry."
                : providerError.statusCode === 401 ||
                    providerError.statusCode === 403
                  ? "Gemini rejected the API key or request. Check GEMINI_API_KEY configuration."
                  : providerError.statusCode === 402
                    ? "The Gemini API project has a billing or quota issue."
                    : "Gemini could not complete this request.",
            type: "GEMINI_API_ERROR",
            detail: providerError.message.slice(0, 300),
            statusCode: providerError.statusCode,
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
        `edit-screen attempt ${attempt}/${MAX_ATTEMPTS} failed for ${screenId}: [${result.type}] ${result.detail}`,
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
        error: "Failed to generate screen. Please retry.",
        type: "GENERATE_SCREEN_ERROR",
      },
      { status: 500 },
    );
  }
}
