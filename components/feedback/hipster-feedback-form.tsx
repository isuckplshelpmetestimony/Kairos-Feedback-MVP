"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"
import type { Project } from "@/lib/data-utils"

interface HipsterFeedbackFormProps {
  project: Project
  onSubmit: (data: any) => void
}

export default function HipsterFeedbackForm({ project, onSubmit }: HipsterFeedbackFormProps) {
  const [formData, setFormData] = useState({
    firstImpression: "",
    firstImpressionRating: "",
    userFlow: "",
    confusing: "",
    visualDesign: "",
    additionalThoughts: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Combine all feedback into a single text
    const feedbackText = `
**First Impression:** ${formData.firstImpressionRating}\n${formData.firstImpression}

**User Flow:** ${formData.userFlow}

**Confusing Elements:** ${formData.confusing}

**Visual Design Suggestions:** ${formData.visualDesign}

**Additional Insights:** ${formData.additionalThoughts}
    `.trim()
    onSubmit({
      type: "hipster",
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
      <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <Lightbulb className="w-6 h-6 text-purple-600" />
        <div>
          <h3 className="font-semibold text-purple-900">Design & User Experience</h3>
          <p className="text-sm text-purple-700">Help improve the user experience and visual design</p>
        </div>
      </div>

      {/* Question 1: First Impression */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">First impression of the design?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Overall impression</Label>
            <RadioGroup
              value={formData.firstImpressionRating}
              onValueChange={(value) => updateField("firstImpressionRating", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excellent" id="excellent" />
                <Label htmlFor="excellent">Excellent - looks professional and polished</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="good" />
                <Label htmlFor="good">Good - solid design with minor improvements needed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="okay" id="okay" />
                <Label htmlFor="okay">Okay - functional but could use design work</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="needs-work" id="needs-work" />
                <Label htmlFor="needs-work">Needs work - design feels unfinished</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstImpression">Detailed first impression</Label>
            <Textarea
              id="firstImpression"
              value={formData.firstImpression}
              onChange={(e) => updateField("firstImpression", e.target.value)}
              placeholder="What stood out to you immediately? Colors, layout, typography, overall feel..."
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Question 2: User Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Is the user flow intuitive?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.userFlow}
            onChange={(e) => updateField("userFlow", e.target.value)}
            placeholder="How easy is it to navigate and complete tasks? Are the user journeys clear and logical?"
            rows={4}
            required
          />
        </CardContent>
      </Card>

      {/* Question 3: Confusing Elements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What's confusing or frustrating?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.confusing}
            onChange={(e) => updateField("confusing", e.target.value)}
            placeholder="Point out specific elements that are unclear, hard to find, or cause friction..."
            rows={4}
            required
          />
        </CardContent>
      </Card>

      {/* Question 4: Visual Design */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Visual design suggestions?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.visualDesign}
            onChange={(e) => updateField("visualDesign", e.target.value)}
            placeholder="Suggestions for colors, typography, spacing, imagery, icons, or overall aesthetic..."
            rows={4}
            required
          />
        </CardContent>
      </Card>

      {/* Additional Thoughts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional UX/Design Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.additionalThoughts}
            onChange={(e) => updateField("additionalThoughts", e.target.value)}
            placeholder="Any other design recommendations, accessibility concerns, or UX improvements..."
            rows={3}
          />
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full">
        Submit Hipster Feedback
      </Button>
    </form>
  )
}
