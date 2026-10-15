import { db } from "@/config";
import { gemini } from "@/config/gemini";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/config/prompts";
import { projectsTable, screenConfigTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const MODEL = "gemini-3.5-flash-lite";
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

    const aiResult = await gemini.models.generateContent({
      model: MODEL,
      contents: userInput,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: MAX_TOKENS,
        responseMimeType: "application/json",
      },
    });

    const content = aiResult.text;

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

        // Your schema currently has "purpose"
        purpose: screen.purpose,

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
    const statusCode =
      typeof error?.status === "number" ? error.status : null;

    if (
      statusCode === 401 ||
      statusCode === 403 ||
      lowerMessage.includes("api key")
    ) {
      return NextResponse.json(
        {
          error: "Gemini rejected the API key or request. Check GEMINI_API_KEY configuration.",
          type: "GEMINI_AUTH_ERROR",
          detail: errorMessage,
        },
        { status: 502 },
      );
    }

    // ----------------------------------------
    // Gemini quota or billing errors
    // ----------------------------------------

    if (
      statusCode === 402 ||
      statusCode === 429 ||
      lowerMessage.includes("quota") ||
      lowerMessage.includes("credit") ||
      lowerMessage.includes("payment") ||
      lowerMessage.includes("insufficient")
    ) {
      return NextResponse.json(
        {
          error: errorMessage,
          type: "GEMINI_QUOTA_ERROR",
        },
        {
          status: statusCode === 429 ? 429 : 402,
        },
      );
    }

    // ----------------------------------------
    // Gemini rate limit
    // ----------------------------------------

    if (
      lowerMessage.includes("rate limit") ||
      lowerMessage.includes("too many requests")
    ) {
      return NextResponse.json(
        {
          error: errorMessage,
          type: "GEMINI_RATE_LIMIT",
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

export async function DELETE(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get("projectId");
  const screenId = req.nextUrl.searchParams.get("screenId");

  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ msg: "Unauthorized User" });
  }
  const result = await db
    .delete(screenConfigTable)
    .where(
      and(
        eq(screenConfigTable.screenId, screenId as string),
        eq(screenConfigTable.projectId, projectId as string),
      ),
    );
    return NextResponse.json({msg:'Deleted'})
}
