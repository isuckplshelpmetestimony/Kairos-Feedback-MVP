import fs from "fs"
import path from "path"

const dataDir = path.join(process.cwd(), "data")

export interface Project {
  id: string
  title: string
  description: string
  url?: string
  feedbackType: "hustler" | "hipster" | "hacker"
  createdAt: string
}

export interface Feedback {
  id: string
  projectId: string
  feedback: string
  type: "hustler" | "hipster" | "hacker"
  helpful: number
  notHelpful: number
  createdAt: string
}

export function readProjects(): Project[] {
  try {
    const filePath = path.join(dataDir, "projects.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading projects:", error)
    return []
  }
}

export function writeProjects(projects: Project[]): void {
  try {
    const filePath = path.join(dataDir, "projects.json")
    fs.writeFileSync(filePath, JSON.stringify(projects, null, 2))
  } catch (error) {
    console.error("Error writing projects:", error)
    throw new Error("Failed to save project")
  }
}

export function readFeedback(): Feedback[] {
  try {
    const filePath = path.join(dataDir, "feedback.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading feedback:", error)
    return []
  }
}

export function writeFeedback(feedback: Feedback[]): void {
  try {
    const filePath = path.join(dataDir, "feedback.json")
    fs.writeFileSync(filePath, JSON.stringify(feedback, null, 2))
  } catch (error) {
    console.error("Error writing feedback:", error)
    throw new Error("Failed to save feedback")
  }
}

export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}
