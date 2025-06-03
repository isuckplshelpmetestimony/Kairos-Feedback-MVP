import type { FeedbackType } from "@/app/submit/page"

interface Answers {
  projectStage?: string
  biggestConcern?: string
  nextGoal?: string
}

export function getFeedbackRecommendation(answers: Answers): FeedbackType {
  const scores = {
    hustler: 0,
    hipster: 0,
    hacker: 0,
  }

  // Score based on project stage
  switch (answers.projectStage) {
    case "idea":
    case "built-no-users":
      scores.hustler += 2
      break
    case "users-clunky-ux":
      scores.hipster += 2
      break
    case "working-messy-code":
      scores.hacker += 2
      break
  }

  // Score based on biggest concern
  switch (answers.biggestConcern) {
    case "real-problem":
      scores.hustler += 2
      break
    case "easy-pleasant":
      scores.hipster += 2
      break
    case "scale-break":
      scores.hacker += 2
      break
  }

  // Score based on next goal
  switch (answers.nextGoal) {
    case "find-customers":
      scores.hustler += 2
      break
    case "improve-ux":
      scores.hipster += 2
      break
    case "clean-debt":
      scores.hacker += 2
      break
  }

  // Return the type with the highest score
  const maxScore = Math.max(...Object.values(scores))
  const recommendedType = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as FeedbackType

  return recommendedType || "hustler" // Default fallback
}

export function getFeedbackTypeDescription(type: FeedbackType): string {
  switch (type) {
    case "hustler":
      return "Business-focused feedback on market validation, customer needs, and growth strategies from entrepreneurial students."
    case "hipster":
      return "Design and UX feedback on user experience, interface design, and usability from design-focused students."
    case "hacker":
      return "Technical feedback on code quality, architecture, scalability, and best practices from engineering students."
  }
}
