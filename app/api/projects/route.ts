import { type NextRequest, NextResponse } from "next/server"
import { getProjects, createProject } from "@/lib/data-utils"

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
    const { title, description, url, feedbackType } = body

    // Validation
    if (!title || !description || !feedbackType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!["hustler", "hipster", "hacker"].includes(feedbackType)) {
      return NextResponse.json({ error: "Invalid feedback type" }, { status: 400 })
    }

    const newProject = await createProject({
      title: title.trim(),
      description: description.trim(),
      url: url?.trim() || undefined,
      feedbackType,
    })

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
