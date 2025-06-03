import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, User } from "lucide-react"
import type { Project } from "@/lib/mock-data"
import Link from "next/link"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white/95 backdrop-blur-sm border-white/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">{project.title}</CardTitle>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {project.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(project.submittedAt)}
              </div>
            </div>
          </div>
          <Badge className={getBadgeColor(project.feedbackType)}>{project.feedbackType}</Badge>
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
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium ml-auto" size="sm">
              Give Feedback
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
