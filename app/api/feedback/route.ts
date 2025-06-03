import { type NextRequest, NextResponse } from "next/server"
import { readFeedback, writeFeedback, generateId, type Feedback } from "@/lib/data-utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, feedback, type } = body

    // Validation
    if (!projectId || !feedback || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!["hustler", "hipster", "hacker"].includes(type)) {
      return NextResponse.json({ error: "Invalid feedback type" }, { status: 400 })
    }

    const allFeedback = readFeedback()
    const newFeedback: Feedback = {
      id: generateId(),
      projectId,
      feedback: feedback.trim(),
      type,
      helpful: 0,
      notHelpful: 0,
      createdAt: new Date().toISOString(),
    }

    allFeedback.unshift(newFeedback) // Add to beginning of array
    writeFeedback(allFeedback)

    return NextResponse.json(newFeedback, { status: 201 })
  } catch (error) {
    console.error("Error creating feedback:", error)
    return NextResponse.json({ error: "Failed to create feedback" }, { status: 500 })
  }
}
