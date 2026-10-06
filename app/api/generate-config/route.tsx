import { db } from "@/config";
import { openrouter } from "@/config/openrouter";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/config/prompts";
import { projectsTable, screenConfigTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const MODEL = "google/gemini-2.5-flash-lite";
const MAX_TOKENS = 650;

export async function POST(req: NextRequest) {
  try {
    // ----------------------------------------
    // Get request data
    // ----------------------------------------

    const { userInput, deviceType, projectId } = await req.json();

    // ----------------------------------------
    // Validate request
    // ----------------------------------------

    if (!userInput || !deviceType || !projectId) {
      return NextResponse.json(
        {
          error: "userInput, deviceType and projectId are required",
          type: "INVALID_REQUEST",
        },
        { status: 400 },
      );
    }

    if (deviceType !== "mobile" && deviceType !== "website") {
      return NextResponse.json(
        {
          error: 'deviceType must be either "mobile" or "website"',
          type: "INVALID_DEVICE_TYPE",
        },
        { status: 400 },
      );
    }

    // ----------------------------------------
    // Prepare system prompt
    // ----------------------------------------

    const systemPrompt = APP_LAYOUT_CONFIG_PROMPT.replace(
      "{deviceType}",
      deviceType,
    );

    // ----------------------------------------
    // Generate configuration using AI
    // ----------------------------------------

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
            content: systemPrompt,
          },
          {
            role: "user",
            content: userInput,
          },
        ],
      },
    });

    // ----------------------------------------
    // Check OpenRouter response
    // ----------------------------------------

    if (!("choices" in aiResult)) {
      return NextResponse.json(
        {
          error: "Invalid response from OpenRouter",
          type: "OPENROUTER_RESPONSE_ERROR",
        },
        { status: 500 },
      );
    }

    const content = aiResult.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        {
          error: "AI returned an empty response",
          type: "EMPTY_AI_RESPONSE",
        },
        { status: 500 },
      );
    }

    // ----------------------------------------
    // Clean AI response
    // ----------------------------------------

    const cleanedContent = content
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    // ----------------------------------------
    // Parse JSON
    // ----------------------------------------

    let jsonAIResult;

    try {
      jsonAIResult = JSON.parse(cleanedContent);
    } catch {
      console.error("Invalid AI JSON:", content);

      return NextResponse.json(
        {
          error: "AI returned invalid JSON",
          type: "INVALID_AI_JSON",
          raw: content,
        },
        { status: 500 },
      );
    }

    // ----------------------------------------
    // Validate project configuration
    // ----------------------------------------

    if (
      !jsonAIResult.projectName ||
      !jsonAIResult.theme ||
      !jsonAIResult.projectVisualDescription ||
      !Array.isArray(jsonAIResult.screens)
    ) {
      return NextResponse.json(
        {
          error: "AI response has an invalid structure",
          type: "INVALID_CONFIG_STRUCTURE",
        },
        { status: 500 },
      );
    }

    // ----------------------------------------
    // Validate exactly 2 screens
    // ----------------------------------------

    if (jsonAIResult.screens.length !== 2) {
      return NextResponse.json(
        {
          error: "AI must generate exactly 2 screens",
          type: "INVALID_SCREEN_COUNT",
          received: jsonAIResult.screens.length,
        },
        { status: 500 },
      );
    }

    // ----------------------------------------
    // Validate each screen
    // ----------------------------------------

    for (const screen of jsonAIResult.screens) {
      if (
        !screen.id ||
        !screen.name ||
        !screen.purpose ||
        !screen.layoutDescription
      ) {
        return NextResponse.json(
          {
            error: "One or more screens are missing required fields",
            type: "INVALID_SCREEN_STRUCTURE",
          },
          { status: 500 },
        );
      }
    }

    // ----------------------------------------
    // Update project
    // ----------------------------------------

    await db
      .update(projectsTable)
      .set({
        projectName: jsonAIResult.projectName,

        theme: jsonAIResult.theme,

        projectVisualDescription: jsonAIResult.projectVisualDescription,
      })
      .where(eq(projectsTable.projectId, projectId));

    // ----------------------------------------
    // Insert screen configurations
    // ----------------------------------------

    for (const screen of jsonAIResult.screens) {
      await db.insert(screenConfigTable).values({
        projectId: projectId,

        screenId: screen.id,

        screenName: screen.name,

        // Your schema currently has "porpose"
        porpose: screen.purpose,

        screenDescription: screen.layoutDescription,

        // Code will be generated later
        code: "",
      });
    }

    // ----------------------------------------
    // Return success
    // ----------------------------------------

    return NextResponse.json({
      success: true,
      projectId,
      jsonAIResult,
    });
  } catch (error: any) {
    console.error("Generate config error:", error);

    const errorMessage =
      error?.message ||
      error?.error?.message ||
      "Failed to generate screen configuration";

    const lowerMessage = errorMessage.toLowerCase();

    // ----------------------------------------
    // OpenRouter credit error
    // ----------------------------------------

    if (
      lowerMessage.includes("credit") ||
      lowerMessage.includes("payment") ||
      lowerMessage.includes("insufficient")
    ) {
      return NextResponse.json(
        {
          error: errorMessage,
          type: "OPENROUTER_LIMIT",
        },
        { status: 402 },
      );
    }

    // ----------------------------------------
    // OpenRouter rate limit
    // ----------------------------------------

    if (
      lowerMessage.includes("rate limit") ||
      lowerMessage.includes("too many requests")
    ) {
      return NextResponse.json(
        {
          error: errorMessage,
          type: "OPENROUTER_RATE_LIMIT",
        },
        { status: 429 },
      );
    }

    // ----------------------------------------
    // Generic error
    // ----------------------------------------

    return NextResponse.json(
      {
        error: errorMessage,
        type: "GENERATE_CONFIG_ERROR",
      },
      { status: 500 },
    );
  }
}
