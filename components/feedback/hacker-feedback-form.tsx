"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code } from "lucide-react"
import type { Project } from "@/lib/data-utils"

interface HackerFeedbackFormProps {
  project: Project
  onSubmit: (data: any) => void
}

export default function HackerFeedbackForm({ project, onSubmit }: HackerFeedbackFormProps) {
  const [formData, setFormData] = useState({
    codeQuality: "",
    codeQualityRating: "",
    architecture: "",
    performance: "",
    security: "",
    additionalThoughts: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Combine all feedback into a single text
    const feedbackText = `
**Code Quality Assessment:** ${formData.codeQualityRating}\n${formData.codeQuality}

**Architecture Suggestions:** ${formData.architecture}

**Performance Issues:** ${formData.performance}

**Security Considerations:** ${formData.security}

**Additional Technical Insights:** ${formData.additionalThoughts}
    `.trim()
    onSubmit({
      type: "hacker",
      projectId: project.id,
      feedback: feedbackText,
    })
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <Code className="w-6 h-6 text-blue-600" />
        <div>
          <h3 className="font-semibold text-blue-900">Technical & Code Review</h3>
          <p className="text-sm text-blue-700">Help improve the technical foundation and code quality</p>
        </div>
      </div>

      {/* Question 1: Code Quality */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Code quality concerns?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Overall code quality assessment</Label>
            <RadioGroup
              value={formData.codeQualityRating}
              onValueChange={(value) => updateField("codeQualityRating", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excellent" id="code-excellent" />
                <Label htmlFor="code-excellent">Excellent - clean, well-structured, follows best practices</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="code-good" />
                <Label htmlFor="code-good">Good - solid foundation with room for improvement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="okay" id="code-okay" />
                <Label htmlFor="code-okay">Okay - functional but needs refactoring</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="needs-work" id="code-needs-work" />
                <Label htmlFor="code-needs-work">Needs work - significant technical debt</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="codeQuality">Specific code quality feedback</Label>
            <Textarea
              id="codeQuality"
              value={formData.codeQuality}
              onChange={(e) => updateField("codeQuality", e.target.value)}
              placeholder="Comment on code organization, naming conventions, documentation, testing, etc..."
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Question 2: Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Architecture suggestions?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.architecture}
            onChange={(e) => updateField("architecture", e.target.value)}
            placeholder="Feedback on system design, data flow, component structure, design patterns..."
            rows={4}
            required
          />
        </CardContent>
      </Card>

      {/* Question 3: Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance issues?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.performance}
            onChange={(e) => updateField("performance", e.target.value)}
            placeholder="Identify potential bottlenecks, optimization opportunities, loading times, memory usage..."
            rows={4}
            required
          />
        </CardContent>
      </Card>

      {/* Question 4: Security */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security considerations?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.security}
            onChange={(e) => updateField("security", e.target.value)}
            placeholder="Point out security vulnerabilities, authentication issues, data protection concerns..."
            rows={4}
            required
          />
        </CardContent>
      </Card>

      {/* Additional Thoughts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Technical Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.additionalThoughts}
            onChange={(e) => updateField("additionalThoughts", e.target.value)}
            placeholder="Technology recommendations, deployment suggestions, monitoring, or other technical advice..."
            rows={3}
          />
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full">
        Submit Hacker Feedback
      </Button>
    </form>
  )
}
