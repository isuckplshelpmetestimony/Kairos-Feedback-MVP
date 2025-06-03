"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionTwoProps {
  selectedAnswer?: string
  onSelect: (answer: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function QuestionTwo({ selectedAnswer, onSelect, onNext, onPrev }: QuestionTwoProps) {
  const options = [
    {
      value: "real-problem",
      label: "Is this solving a real problem?",
      description: "I'm not sure if people actually need this",
    },
    {
      value: "easy-pleasant",
      label: "Is it easy/pleasant to use?",
      description: "I want to make sure the user experience is great",
    },
    {
      value: "scale-break",
      label: "Will this code scale/break?",
      description: "I'm worried about technical debt and scalability",
    },
  ]

  return (
    <div className="space-y-6">
      <RadioGroup value={selectedAnswer} onValueChange={onSelect}>
        {options.map((option) => (
          <div key={option.value} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
            <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
            <div className="flex-1">
              <Label htmlFor={option.value} className="text-base font-medium cursor-pointer">
                {option.label}
              </Label>
              <p className="text-sm text-gray-600 mt-1">{option.description}</p>
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button onClick={onNext} disabled={!selectedAnswer}>
          Next
        </Button>
      </div>
    </div>
  )
}
