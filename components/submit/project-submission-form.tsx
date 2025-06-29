"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Lightbulb, Code, Loader2 } from "lucide-react"
import type { FeedbackType } from "@/app/submit/page"

interface ProjectSubmissionFormProps {
  selectedType: FeedbackType
  onSubmit: (data: { title: string; description: string; url: string; feedbackType: FeedbackType }) => void
  onPrev: () => void
  loading?: boolean
}

export default function ProjectSubmissionForm({ selectedType, onSubmit, onPrev, loading }: ProjectSubmissionFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    notificationEmail: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const projectData = {
      ...formData,
      feedbackType: selectedType.toLowerCase() as FeedbackType
    }
    
    await onSubmit(projectData)
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const getTypeIcon = () => {
    switch (selectedType) {
      case "hustler":
        return <TrendingUp className="w-6 h-6 text-green-600" />
      case "hipster":
        return <Lightbulb className="w-6 h-6 text-purple-600" />
      case "hacker":
        return <Code className="w-6 h-6 text-blue-600" />
    }
  }

  const getTypeColor = () => {
    switch (selectedType) {
      case "hustler":
        return "text-green-600"
      case "hipster":
        return "text-purple-600"
      case "hacker":
        return "text-blue-600"
    }
  }

  const capitalizeType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <div className="space-y-6">
      {/* Selected Feedback Type */}
      <Card className="border-2 border-dashed">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            {getTypeIcon()}
            <CardTitle className={`text-lg ${getTypeColor()}`}>
              {capitalizeType(selectedType)} Feedback Selected
            </CardTitle>
          </div>
          <CardDescription>
            Your project will be reviewed by students specializing in {selectedType} skills.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Project Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Enter your project title"
            className={errors.title ? "border-red-500" : ""}
            disabled={loading}
          />
          {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Project Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your project, what it does, and what specific feedback you're looking for..."
            rows={6}
            className={errors.description ? "border-red-500" : ""}
            disabled={loading}
          />
          {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
          <p className="text-sm text-gray-500">
            Be specific about what you'd like feedback on to get the most helpful responses.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">Project URL</Label>
          <Input
            id="url"
            type="url"
            value={formData.url}
            onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
            placeholder="https://your-project.com"
            className={errors.url ? "border-red-500" : ""}
            disabled={loading}
          />
          {errors.url && <p className="text-sm text-red-600">{errors.url}</p>}
          <p className="text-sm text-gray-500">Optional: Link to your live project, GitHub repo, or demo</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notificationEmail">Notification Email (optional)</Label>
          <Input
            id="notificationEmail"
            type="email"
            value={formData.notificationEmail}
            onChange={(e) => setFormData((prev) => ({ ...prev, notificationEmail: e.target.value }))}
            placeholder="We'll notify you at this email when someone leaves feedback on your project."
          />
          <p className="text-xs text-muted-foreground">
            We'll notify you at this email when someone leaves feedback on your project.<br />
            <span className="text-xs text-yellow-600 font-medium">
              For your first notification, the email may go to your spam folder. Please mark it as NOT SPAM to ensure you continue receiving feedback notifications.
            </span>
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrev} disabled={loading}>
            Previous
          </Button>
          <Button type="submit" disabled={loading || !formData.title || !formData.description}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Project for Feedback"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}