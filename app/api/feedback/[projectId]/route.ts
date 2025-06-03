import { type NextRequest, NextResponse } from "next/server"
import { readFeedback } from "@/lib/data-utils"

export async function GET(request: NextRequest, { params }: { params: { projectId: string } }) {
  try {
    const allFeedback = readFeedback()
    const projectFeedback = allFeedback.filter((f) => f.projectId === params.projectId)

    return NextResponse.json(projectFeedback)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 })
  }
}
