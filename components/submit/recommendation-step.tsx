"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { TrendingUp, Lightbulb, Code, CheckCircle } from "lucide-react"
import type { FeedbackType } from "@/app/submit/page"
import { getFeedbackTypeDescription } from "@/lib/recommendation-logic"

interface RecommendationStepProps {
  recommendedType: FeedbackType
  selectedType: FeedbackType
  onSelectType: (type: FeedbackType) => void
  onNext: () => void
  onPrev: () => void
}

export default function RecommendationStep({
  recommendedType,
  selectedType,
  onSelectType,
  onNext,
  onPrev,
}: RecommendationStepProps) {
  const feedbackTypes = [
    {
      type: "hustler" as FeedbackType,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      type: "hipster" as FeedbackType,
      icon: Lightbulb,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      type: "hacker" as FeedbackType,
      icon: Code,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Recommendation */}
      <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
        <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-blue-900 mb-2">We recommend {recommendedType} feedback</h3>
        <p className="text-blue-700">{getFeedbackTypeDescription(recommendedType)}</p>
      </div>

      {/* Override Options */}
      <div>
        <h4 className="text-lg font-medium mb-4">Or choose a different feedback type:</h4>
        <RadioGroup value={selectedType} onValueChange={onSelectType}>
          {feedbackTypes.map(({ type, icon: Icon, color, bgColor, borderColor }) => (
            <div
              key={type}
              className={`flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 ${
                type === recommendedType ? `${bgColor} ${borderColor}` : ""
              }`}
            >
              <RadioGroupItem value={type} id={type} className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <Label htmlFor={type} className="text-base font-medium cursor-pointer">
                    {type} Feedback
                    {type === recommendedType && (
                      <span className="ml-2 text-sm text-blue-600 font-normal">(Recommended)</span>
                    )}
                  </Label>
                </div>
                <p className="text-sm text-gray-600">{getFeedbackTypeDescription(type)}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button onClick={onNext}>Continue with {selectedType} Feedback</Button>
      </div>
    </div>
  )
}
