import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const searchParams = req.nextUrl.searchParams;
    const queryUserId = searchParams.get("userId");
    const parentId = searchParams.get("parentId");

    if (!queryUserId || queryUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    //fetch files from db
    let userFiles;
    if (parentId) {
      // fetching from specific folder
      userFiles = await db
        .select()
        .from(files)
        .where(and(eq(files.userId, userId), eq(files.parentId, parentId)));
    } else {
      userFiles = await db
        .select()
        .from(files)
        .where(and(eq(files.userId, userId), isNull(files.parentId)));
    }
    return NextResponse.json(userFiles);
  } catch (error: any) {
    console.error(
      error.errors?.[0]?.message ||
        "An error occurred during creating file. Please try again."
    );

    return NextResponse.json({
      error: "Unable to create a file",
      status: 401,
    });
  }
}
