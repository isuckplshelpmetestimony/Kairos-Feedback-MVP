"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Calendar, Loader2, ThumbsUp, ThumbsDown } from "lucide-react"
import Link from "next/link"
import { api, useApi } from "@/hooks/use-api"
import type { Project, Feedback } from "@/lib/data-utils"
import HustlerFeedbackForm from "@/components/feedback/hustler-feedback-form"
import HipsterFeedbackForm from "@/components/feedback/hipster-feedback-form"
import HackerFeedbackForm from "@/components/feedback/hacker-feedback-form"

function FeedbackItem({
  feedback,
  onVote,
}: { feedback: Feedback; onVote: (id: string, vote: "helpful" | "notHelpful") => void }) {
  const [voting, setVoting] = useState<"helpful" | "notHelpful" | null>(null)

  const handleVote = async (vote: "helpful" | "notHelpful") => {
    setVoting(vote)
    try {
      await onVote(feedback.id, vote)
    } finally {
      setVoting(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="text-sm text-gray-500">
            <Calendar className="w-4 h-4 inline mr-1" />
            {formatDate(feedback.createdAt)}
          </div>
          <Badge variant="outline" className="text-xs">
            {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)} Feedback
          </Badge>
        </div>

        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{feedback.feedback}</p>

        <div className="flex items-center gap-4 text-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote("helpful")}
            disabled={voting !== null}
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            {voting === "helpful" ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <ThumbsUp className="w-4 h-4 mr-1" />
            )}
            Helpful ({feedback.helpful})
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote("notHelpful")}
            disabled={voting !== null}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            {voting === "notHelpful" ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <ThumbsDown className="w-4 h-4 mr-1" />
            )}
            Not Helpful ({feedback.notHelpful})
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function FeedbackPage() {
  const params = useParams()
  const projectId = params.projectId as string

  const { data: project, loading: projectLoading, execute: fetchProject } = useApi<Project>()
  const { data: feedbackList, loading: feedbackLoading, execute: fetchFeedback } = useApi<Feedback[]>()
  const { execute: submitFeedback } = useApi()
  const { execute: voteFeedback } = useApi()

  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (projectId) {
      fetchProject(() => api.projects.getById(projectId))
      fetchFeedback(() => api.feedback.getByProjectId(projectId))
    }
  }, [projectId])

  const handleFeedbackSubmit = async (feedbackData: any) => {
    try {
      await submitFeedback(() =>
        api.feedback.create({
          projectId,
          feedback: feedbackData.feedback,
          type: feedbackData.type,
        }),
      )
      setIsSubmitted(true)
      // Refresh feedback list
      fetchFeedback(() => api.feedback.getByProjectId(projectId))
    } catch (error) {
      console.error("Error submitting feedback:", error)
    }
  }

  const handleVote = async (feedbackId: string, vote: "helpful" | "notHelpful") => {
    try {
      await voteFeedback(() => api.feedback.vote(feedbackId, vote))
      // Refresh feedback list
      fetchFeedback(() => api.feedback.getByProjectId(projectId))
    } catch (error) {
      console.error("Error voting:", error)
    }
  }

  if (projectLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Feedback Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for helping improve this project. Your insights are valuable!
            </p>
            <div className="space-y-3">
              <Link href="/" className="block">
                <Button className="w-full">Back to Projects</Button>
              </Link>
              <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
                View All Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "hustler":
        return "bg-green-100 text-green-800"
      case "hipster":
        return "bg-purple-100 text-purple-800"
      case "hacker":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const capitalizeType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Give Feedback</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 mb-6">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-4">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <Badge className={getBadgeColor(project.feedbackType)}>{capitalizeType(project.feedbackType)}</Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {formatDate(project.createdAt)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{project.description}</p>
                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Project
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Existing Feedback */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Previous Feedback ({feedbackList?.length || 0})
              </h3>
              {feedbackLoading ? (
                <div className="text-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
                </div>
              ) : feedbackList && feedbackList.length > 0 ? (
                <div className="space-y-4">
                  {feedbackList.map((feedback) => (
                    <FeedbackItem key={feedback.id} feedback={feedback} onVote={handleVote} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No feedback yet. Be the first to help!</p>
              )}
            </div>
          </div>

          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {capitalizeType(project.feedbackType)} Feedback for "{project.title}"
                </CardTitle>
                <p className="text-gray-600">
                  Your insights will help improve this project. Please be constructive and specific.
                </p>
              </CardHeader>
              <CardContent>
                {project.feedbackType === "hustler" && (
                  <HustlerFeedbackForm project={project} onSubmit={handleFeedbackSubmit} />
                )}
                {project.feedbackType === "hipster" && (
                  <HipsterFeedbackForm project={project} onSubmit={handleFeedbackSubmit} />
                )}
                {project.feedbackType === "hacker" && (
                  <HackerFeedbackForm project={project} onSubmit={handleFeedbackSubmit} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
