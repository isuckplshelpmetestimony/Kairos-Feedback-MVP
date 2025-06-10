import { type NextRequest, NextResponse } from "next/server"
import { getProjects, createProject } from "../../../lib/data-utils"
import { z } from "zod"

const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  url: z.string().url("Invalid URL").optional().or(z.literal("").transform(() => undefined)),
  feedbackType: z.enum(["hustler", "hipster", "hacker"]),
  ownerToken: z.string().min(1, "Missing owner token"),
  notificationEmail: z.string().email("Invalid email").optional().or(z.literal("").transform(() => undefined)),
})

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = ProjectSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error.flatten() }, { status: 400 })
    }
    const { title, description, url, feedbackType, ownerToken, notificationEmail } = result.data
    const newProject = await createProject({
      title: title.trim(),
      description: description.trim(),
      url: url?.trim() || undefined,
      feedbackType,
      ownerToken,
      notificationEmail: notificationEmail?.trim() || undefined,
    })
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    // TEMP: Return error details for debugging
    return NextResponse.json({ error: "Failed to create project", details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
