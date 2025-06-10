import { type NextRequest, NextResponse } from "next/server"
import { createFeedback, getProjectById } from "@/lib/data-utils"
import { sendEmail } from "@/lib/email"

/**
 * Feedback submission handler.
 * If the associated project has a notificationEmail, send an email notification to the owner when new feedback is submitted.
 */
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

    // Notify project owner if notificationEmail exists
    const project = await getProjectById(projectId);
    if (project && project.notificationEmail) {
      const projectUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/feedback/${projectId}`;
      try {
        await sendEmail({
          to: project.notificationEmail,
          subject: `New Feedback on Your Project: ${project.title}`,
          html: `<p>You received new feedback on your project <b>${project.title}</b>:</p><pre>${feedback}</pre><p>View all feedback: <a href="${projectUrl}">${projectUrl}</a></p>`,
          text: `You received new feedback on your project "${project.title}":\n\n${feedback}\n\nView all feedback: ${projectUrl}`,
        });
      } catch (emailError) {
        console.error("Failed to send feedback notification email:", emailError);
      }
    }

    return NextResponse.json(newFeedback, { status: 201 })
  } catch (error) {
    console.error("Error creating feedback:", error)
    return NextResponse.json({ error: "Failed to create feedback" }, { status: 500 })
  }
}
