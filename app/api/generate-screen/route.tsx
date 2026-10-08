import { db } from "@/config";
import { openrouter } from "@/config/openrouter";
import { GENERATION_SYSTEM_PROMPT } from "@/config/prompts";
import { screenConfigTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const MODEL = "google/gemini-2.5-flash-lite";
// A full screen mockup lands around 2.7k–3.5k completion tokens (including
// reasoning). The old 4000 cap left almost no headroom, so longer screens got
// cut off mid-markup and failed validation.
const MAX_TOKENS = 8000;
const MAX_ATTEMPTS = 2;

const stripFences = (raw: string) =>
  raw
    .replace(/^```html\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

// Returns a rejection reason, or null when the markup is safe to persist.
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

const generateAttempt = async (
  userInput: string,
): Promise<Attempt> => {
  const aiResult = await openrouter.chat.send({
    chatRequest: {
      model: MODEL,
      maxTokens: MAX_TOKENS,

      reasoning: {
        effort: "minimal",
      },

      messages: [
        {
          role: "system",
          content: GENERATION_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userInput,
        },
      ],
    },
  });

  if (!("choices" in aiResult)) {
    return {
      ok: false,
      type: "OPENROUTER_RESPONSE_ERROR",
      detail: "response had no choices",
    };
  }

  const choice = aiResult.choices?.[0];
  const finishReason = choice?.finishReason ?? null;
  const rawCode = choice?.message?.content;

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

  try {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const result = await generateAttempt(userInput);

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
        error: "Failed to generate screen. Please retry.",
        type: "GENERATE_SCREEN_ERROR",
      },
      { status: 500 },
    );
  }
}
