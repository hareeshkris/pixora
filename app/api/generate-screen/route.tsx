import { db } from "@/config";
import { openrouter } from "@/config/openrouter";
import { GENERATION_SYSTEM_PROMPT } from "@/config/prompts";
import { screenConfigTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    projectId,
    screenId,
    screenName,
    purpose,
    screenDescription,
    projectVisualDescription,
  } = await req.json();
  const MODEL = "google/gemini-2.5-flash-lite";
  const MAX_TOKENS = 650;

  const userInput = `screen name is : ${screenName} ,
   screen purpose ${purpose}, screen description : ${screenDescription}`;

  try {
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
      return NextResponse.json(
        {
          error: "Invalid response from OpenRouter",
          type: "OPENROUTER_RESPONSE_ERROR",
        },
        { status: 500 },
      );
    }

    const code = aiResult.choices?.[0]?.message?.content;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        {
          error: "AI returned an empty response",
          type: "EMPTY_AI_RESPONSE",
        },
        { status: 500 },
      );
    }

    const updatedResult = await db
      .update(screenConfigTable)
      .set({
        code,
      })
      .where(
        and(
          eq(screenConfigTable.projectId, projectId),
          eq(screenConfigTable.screenId, screenId as string),
        ),
      )
      .returning();
    return NextResponse.json(updatedResult[0]);
  } catch (error) {
    return NextResponse.json({ msg: "Internal server error.." });
  }
}
