"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionThreeProps {
  selectedAnswer?: string
  onSelect: (answer: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function QuestionThree({ selectedAnswer, onSelect, onNext, onPrev }: QuestionThreeProps) {
  const options = [
    {
      value: "find-customers",
      label: "Find first customers",
      description: "I need to validate demand and get initial users",
    },
    {
      value: "improve-ux",
      label: "Improve user experience",
      description: "I want to make the product more intuitive and enjoyable",
    },
    {
      value: "clean-debt",
      label: "Clean up technical debt",
      description: "I need to refactor and improve the codebase",
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
