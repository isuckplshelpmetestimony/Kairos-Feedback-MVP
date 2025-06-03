import { type NextRequest, NextResponse } from "next/server"
import { readProjects } from "@/lib/data-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projects = readProjects()
    const project = projects.find((p) => p.id === params.id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}
