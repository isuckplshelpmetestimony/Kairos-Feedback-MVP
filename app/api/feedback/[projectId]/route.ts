import { type NextRequest, NextResponse } from "next/server"
import { getFeedbackByProjectId } from "@/lib/data-utils"

export async function GET(request: NextRequest, context: { params: Promise<{ projectId: string }> }) {
  try {
    const { projectId } = await context.params;
    const projectFeedback = await getFeedbackByProjectId(projectId);
    return NextResponse.json(projectFeedback)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 })
  }
}
