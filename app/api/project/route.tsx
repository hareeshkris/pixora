import { db } from "@/config";
import { projectsTable, screenConfigTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { device, userInput, projectId } = await req.json();
  const user = await currentUser();
  const data = await db
    .insert(projectsTable)
    .values({
      projectId,
      userId: user?.primaryEmailAddress?.emailAddress as string,
      device: device,
      userInput: userInput,
    })
    .returning();

  return NextResponse.json(data[0] ?? {});
}

export async function GET(req: NextRequest) {
  const projectId = await req.nextUrl.searchParams.get("projectId");
  const user = await currentUser();

  if (!projectId) {
    return NextResponse.json(
      { error: "Project ID is required" },
      { status: 400 },
    );
  }
  try {
    const project = await db
      .select()
      .from(projectsTable)
      .where(
        and(
          eq(projectsTable.projectId, projectId),
          eq(
            projectsTable.userId,
            user?.primaryEmailAddress?.emailAddress as string,
          ),
        ),
      )
      .limit(1);

    const screen = await db
      .select()
      .from(screenConfigTable)
      .where(eq(screenConfigTable.projectId, projectId as string));

    return NextResponse.json({
      projectDetail: project[0],
      screenConfig: screen,
    });
  } catch (error) {
    return NextResponse.json({ msg: "Error" });
  }
}
