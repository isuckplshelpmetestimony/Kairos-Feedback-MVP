import { type NextRequest, NextResponse } from "next/server"
import { readFeedback, writeFeedback } from "@/lib/data-utils"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { vote } = body

    if (!["helpful", "notHelpful"].includes(vote)) {
      return NextResponse.json({ error: "Invalid vote type" }, { status: 400 })
    }

    const allFeedback = readFeedback()
    const feedbackIndex = allFeedback.findIndex((f) => f.id === params.id)

    if (feedbackIndex === -1) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 })
    }

    if (vote === "helpful") {
      allFeedback[feedbackIndex].helpful += 1
    } else {
      allFeedback[feedbackIndex].notHelpful += 1
    }

    writeFeedback(allFeedback)

    return NextResponse.json(allFeedback[feedbackIndex])
  } catch (error) {
    console.error("Error voting on feedback:", error)
    return NextResponse.json({ error: "Failed to vote on feedback" }, { status: 500 })
  }
}
