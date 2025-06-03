import type { FeedbackType } from "@/app/submit/page"

export interface Project {
  id: string
  title: string
  description: string
  url?: string
  feedbackType: FeedbackType
  submittedAt: Date
  author: string
}

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "TaskFlow - Project Management App",
    description:
      "A modern project management tool built with React and Node.js. Looking for feedback on user experience and feature prioritization.",
    url: "https://taskflow-demo.com",
    feedbackType: "hipster",
    submittedAt: new Date("2024-01-15"),
    author: "Sarah Chen",
  },
  {
    id: "2",
    title: "EcoTracker - Carbon Footprint Calculator",
    description:
      "Mobile app that helps users track and reduce their carbon footprint. Need validation on market demand and business model.",
    url: "https://ecotracker.app",
    feedbackType: "hustler",
    submittedAt: new Date("2024-01-14"),
    author: "Mike Rodriguez",
  },
  {
    id: "3",
    title: "CodeReview AI - Automated Code Analysis",
    description:
      "AI-powered tool for automated code reviews and suggestions. Looking for technical feedback on architecture and scalability.",
    url: "https://github.com/user/codereview-ai",
    feedbackType: "hacker",
    submittedAt: new Date("2024-01-13"),
    author: "Alex Kim",
  },
  {
    id: "4",
    title: "StudyBuddy - Collaborative Learning Platform",
    description:
      "Platform connecting students for study groups and peer learning. Seeking UX feedback on the matching algorithm interface.",
    feedbackType: "hipster",
    submittedAt: new Date("2024-01-12"),
    author: "Emma Thompson",
  },
  {
    id: "5",
    title: "LocalEats - Restaurant Discovery App",
    description:
      "Hyperlocal restaurant discovery app focusing on hidden gems. Need feedback on go-to-market strategy and user acquisition.",
    url: "https://localeats.co",
    feedbackType: "hustler",
    submittedAt: new Date("2024-01-11"),
    author: "David Park",
  },
  {
    id: "6",
    title: "DevTools Pro - Developer Productivity Suite",
    description:
      "Collection of developer tools integrated into one dashboard. Looking for technical review of the plugin architecture.",
    url: "https://devtools-pro.dev",
    feedbackType: "hacker",
    submittedAt: new Date("2024-01-10"),
    author: "Lisa Wang",
  },
]
