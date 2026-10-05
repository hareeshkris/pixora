import { db } from "@/config";
import { projectsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
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
