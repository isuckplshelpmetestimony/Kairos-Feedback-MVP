"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Loader2 } from "lucide-react"
import type { Project } from "@/lib/data-utils"

interface HustlerFeedbackFormProps {
  project: Project
  onSubmit: (data: any) => void
}

export default function HustlerFeedbackForm({ project, onSubmit }: HustlerFeedbackFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    realProblem: "",
    realProblemExplanation: "",
    whoWouldPay: "",
    monetization: "",
    marketConcern: "",
    additionalThoughts: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Combine all feedback into a single text
      const feedbackText = `
**Problem Assessment:** ${formData.realProblem}
${formData.realProblemExplanation}

**Target Customers:** ${formData.whoWouldPay}

**Monetization Strategy:** ${formData.monetization}

**Market Concerns:** ${formData.marketConcern}

**Additional Insights:** ${formData.additionalThoughts}
      `.trim()

      await onSubmit({
        feedback: feedbackText,
        type: "hustler",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.realProblem && formData.whoWouldPay && formData.monetization && formData.marketConcern

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
        <TrendingUp className="w-6 h-6 text-green-600" />
        <div>
          <h3 className="font-semibold text-green-900">Business & Market Validation</h3>
          <p className="text-sm text-green-700">Help validate the business potential and market fit</p>
        </div>
      </div>

      {/* Question 1: Real Problem */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Is this solving a real problem?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={formData.realProblem} onValueChange={(value) => updateField("realProblem", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="definitely" id="definitely" />
              <Label htmlFor="definitely">Definitely - this is a pain point I've experienced</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="probably" id="probably" />
              <Label htmlFor="probably">Probably - seems like a valid problem</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="maybe" id="maybe" />
              <Label htmlFor="maybe">Maybe - not sure if it's widespread enough</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unlikely" id="unlikely" />
              <Label htmlFor="unlikely">Unlikely - seems like a nice-to-have</Label>
            </div>
          </RadioGroup>
          <div className="space-y-2">
            <Label htmlFor="realProblemExplanation">Explain your reasoning</Label>
            <Textarea
              id="realProblemExplanation"
              value={formData.realProblemExplanation}
              onChange={(e) => updateField("realProblemExplanation", e.target.value)}
              placeholder="Why do you think this is/isn't a real problem? Share your perspective..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Question 2: Who Would Pay */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Who would pay for this?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.whoWouldPay}
            onChange={(e) => updateField("whoWouldPay", e.target.value)}
            placeholder="Describe the target customer segments who would be willing to pay for this solution..."
            rows={4}
            required
          />
        </CardContent>
      </Card>

      {/* Question 3: Monetization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How would you monetize it?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.monetization}
            onChange={(e) => updateField("monetization", e.target.value)}
            placeholder="Suggest potential revenue models (subscription, one-time purchase, freemium, ads, etc.)..."
            rows={4}
            required
          />
        </CardContent>
      </Card>

      {/* Question 4: Market Concern */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What's your biggest market concern?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.marketConcern}
            onChange={(e) => updateField("marketConcern", e.target.value)}
            placeholder="What challenges do you see in bringing this to market? Competition, timing, adoption barriers..."
            rows={4}
            required
          />
        </CardContent>
      </Card>

      {/* Additional Thoughts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Business Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.additionalThoughts}
            onChange={(e) => updateField("additionalThoughts", e.target.value)}
            placeholder="Any other business advice, market insights, or strategic suggestions..."
            rows={3}
          />
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full" disabled={!isFormValid || loading}>
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting Feedback...
          </>
        ) : (
          "Submit Hustler Feedback"
        )}
      </Button>
    </form>
  )
}
