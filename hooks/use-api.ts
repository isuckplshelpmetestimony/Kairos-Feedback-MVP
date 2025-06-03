"use client"

import { useState } from "react"

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = async (apiCall: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null })

    try {
      const result = await apiCall()
      setState({ data: result, loading: false, error: null })
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      setState({ data: null, loading: false, error: errorMessage })
      throw error
    }
  }

  return { ...state, execute }
}

// API functions
export const api = {
  projects: {
    getAll: async () => {
      const response = await fetch("/api/projects")
      if (!response.ok) throw new Error("Failed to fetch projects")
      return response.json()
    },

    getById: async (id: string) => {
      const response = await fetch(`/api/projects/${id}`)
      if (!response.ok) throw new Error("Failed to fetch project")
      return response.json()
    },

    create: async (project: any) => {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      })
      if (!response.ok) throw new Error("Failed to create project")
      return response.json()
    },
  },

  feedback: {
    getByProjectId: async (projectId: string) => {
      const response = await fetch(`/api/feedback/${projectId}`)
      if (!response.ok) throw new Error("Failed to fetch feedback")
      return response.json()
    },

    create: async (feedback: any) => {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback),
      })
      if (!response.ok) throw new Error("Failed to submit feedback")
      return response.json()
    },

    vote: async (id: string, vote: "helpful" | "notHelpful") => {
      const response = await fetch(`/api/feedback/vote/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vote }),
      })
      if (!response.ok) throw new Error("Failed to vote")
      return response.json()
    },
  },
}
