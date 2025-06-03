import { type NextRequest, NextResponse } from "next/server"
import { createFeedback } from "@/lib/data-utils"

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    console.log('RAW BODY:', rawBody);
    const body = JSON.parse(rawBody);
    console.log('PARSED BODY:', body);
    const { projectId, feedback, type } = body

    // Validation
    if (!projectId || !feedback || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!["hustler", "hipster", "hacker"].includes(type)) {
      return NextResponse.json({ error: "Invalid feedback type" }, { status: 400 })
    }

    const newFeedback = await createFeedback({
      projectId,
      feedback: feedback.trim(),
      type,
      helpful: 0,
      notHelpful: 0,
    })

    return NextResponse.json(newFeedback, { status: 201 })
  } catch (error) {
    console.error("Error creating feedback:", error)
    return NextResponse.json({ error: "Failed to create feedback" }, { status: 500 })
  }
}
