"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionOneProps {
  selectedAnswer?: string
  onSelect: (answer: string) => void
  onNext: () => void
}

export default function QuestionOne({ selectedAnswer, onSelect, onNext }: QuestionOneProps) {
  const options = [
    {
      value: "idea",
      label: "Just an idea/concept",
      description: "I have an idea but haven't built anything yet",
    },
    {
      value: "built-no-users",
      label: "Built but no users yet",
      description: "I've built something but haven't launched or gotten users",
    },
    {
      value: "users-clunky-ux",
      label: "Have users but UX feels clunky",
      description: "People are using it but the experience isn't smooth",
    },
    {
      value: "working-messy-code",
      label: "Working well but code is messy",
      description: "Users are happy but the technical foundation needs work",
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

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!selectedAnswer}>
          Next
        </Button>
      </div>
    </div>
  )
}
