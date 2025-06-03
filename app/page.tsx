"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, TrendingUp, Lightbulb, Code, Loader2 } from "lucide-react"
import Link from "next/link"
import { api, useApi } from "@/hooks/use-api"
import type { Project } from "@/lib/data-utils"

function ProjectCard({ project }: { project: Project }) {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "hustler":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "hipster":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "hacker":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const capitalizeType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">{project.title}</CardTitle>
            <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              {formatDate(project.createdAt)}
            </div>
          </div>
          <Badge className={getBadgeColor(project.feedbackType)}>{capitalizeType(project.feedbackType)}</Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CardDescription className="text-gray-700 line-clamp-3 mb-4">{project.description}</CardDescription>

        <div className="flex items-center justify-between gap-3">
          {project.url && (
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Project
            </Link>
          )}

          <Link href={`/feedback/${project.id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium ml-auto" size="sm">
              Give Feedback
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const { data: projects, loading, error, execute } = useApi<Project[]>()

  useEffect(() => {
    execute(api.projects.getAll)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading projects: {error}</p>
          <Button onClick={() => execute(api.projects.getAll)}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Kairos Feedback
            </Link>
            <Link href="/submit">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6">Submit Project</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get Targeted Feedback
            <br />
            <span className="text-blue-600">From Students</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Submit your project and receive expert feedback from students specializing in business, design, or technical
            skills.
          </p>
          <Link href="/submit">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3">
              Submit Your Project
            </Button>
          </Link>
        </div>

        {/* Feedback Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <CardTitle className="text-green-600">Hustler Feedback</CardTitle>
              <CardDescription>Business & Market Validation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Get insights on market fit, business model, and customer validation from entrepreneurial students.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Lightbulb className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <CardTitle className="text-purple-600">Hipster Feedback</CardTitle>
              <CardDescription>Design & User Experience</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Receive UX/UI feedback, design critiques, and usability insights from design-focused students.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Code className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <CardTitle className="text-blue-600">Hacker Feedback</CardTitle>
              <CardDescription>Technical & Code Review</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Get technical feedback, code reviews, and architecture insights from engineering students.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Projects</h2>
              <p className="text-gray-600">Help developers improve their projects with your insights</p>
            </div>
            <div className="text-gray-500 text-sm">{projects?.length || 0} projects waiting for feedback</div>
          </div>

          {/* Project Grid */}
          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No projects yet. Be the first to submit one!</p>
              <Link href="/submit">
                <Button>Submit First Project</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
