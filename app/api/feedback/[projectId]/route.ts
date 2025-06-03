import { type NextRequest, NextResponse } from "next/server"
import { getFeedbackByProjectId } from "@/lib/data-utils"

export async function GET(request: NextRequest, { params }: { params: { projectId: string } }) {
  try {
    const projectFeedback = await getFeedbackByProjectId(params.projectId)
    return NextResponse.json(projectFeedback)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 })
  }
}
