import { type NextRequest, NextResponse } from "next/server"
import { getProjectById, deleteProject } from "@/lib/data-utils"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const project = await getProjectById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    // Accept ownerToken from either header or body
    let ownerToken = request.headers.get("x-owner-token");
    if (!ownerToken) {
      try {
        const body = await request.json();
        ownerToken = body.ownerToken;
      } catch {}
    }
    if (!ownerToken) {
      return NextResponse.json({ error: "Missing owner token" }, { status: 400 })
    }
    const project = await getProjectById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    if (project.ownerToken !== ownerToken) {
      return NextResponse.json({ error: "Not authorized to delete this project" }, { status: 403 })
    }
    const deleted = await deleteProject(id);
    if (!deleted) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
