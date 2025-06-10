"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import QuestionOne from "@/components/submit/question-one"
import QuestionTwo from "@/components/submit/question-two"
import QuestionThree from "@/components/submit/question-three"
import RecommendationStep from "@/components/submit/recommendation-step"
import ProjectSubmissionForm from "@/components/submit/project-submission-form"
import { getFeedbackRecommendation } from "@/lib/recommendation-logic"
import { api, useApi } from "@/hooks/use-api"
import { v4 as uuidv4 } from 'uuid'

export type FeedbackType = "hustler" | "hipster" | "hacker"

export interface SubmissionState {
  step: number
  answers: {
    projectStage?: string
    biggestConcern?: string
    nextGoal?: string
  }
  recommendedType?: FeedbackType
  selectedType?: FeedbackType
}

export default function SubmitPage() {
  const router = useRouter()
  const { loading, execute } = useApi()
  const [state, setState] = useState<SubmissionState>({
    step: 1,
    answers: {},
  })

  // Ensure ownerToken is set as soon as the page loads (client-side)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem('ownerToken');
      if (!token || typeof token !== 'string' || token.length < 10) {
        token = uuidv4();
        localStorage.setItem('ownerToken', token);
      }
    }
  }, [])

  const updateAnswer = (key: keyof SubmissionState["answers"], value: string) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [key]: value },
    }))
  }

  const nextStep = () => {
    if (state.step === 3) {
      // Calculate recommendation after question 3
      const recommendation = getFeedbackRecommendation(state.answers)
      setState((prev) => ({
        ...prev,
        step: prev.step + 1,
        recommendedType: recommendation,
        selectedType: recommendation,
      }))
    } else {
      setState((prev) => ({ ...prev, step: prev.step + 1 }))
    }
  }

  const prevStep = () => {
    setState((prev) => ({ ...prev, step: prev.step - 1 }))
  }

  const selectFeedbackType = (type: FeedbackType) => {
    setState((prev) => ({ ...prev, selectedType: type.toLowerCase() as FeedbackType }))
  }

  const getOwnerToken = () => {
    if (typeof window === 'undefined') return '';
    let token = localStorage.getItem('ownerToken');
    // Always generate a new token if not present
    if (!token || typeof token !== 'string' || token.length < 10) {
      token = uuidv4();
      localStorage.setItem('ownerToken', token);
    }
    return token;
  };

  const submitProject = async (projectData: { title: string; description: string; url: string; notificationEmail?: string }) => {
    const feedbackType = (state.selectedType || '').toLowerCase();
    if (!['hustler', 'hipster', 'hacker'].includes(feedbackType)) {
      alert('Feedback type is invalid: ' + feedbackType);
      return;
    }
    const ownerToken = getOwnerToken();
    console.log("Submitting project:", {
      title: projectData.title,
      description: projectData.description,
      url: projectData.url || undefined,
      feedbackType,
      ownerToken,
      notificationEmail: projectData.notificationEmail || undefined,
    });
    try {
      await execute(() =>
        api.projects.create({
          title: projectData.title,
          description: projectData.description,
          url: projectData.url || undefined,
          feedbackType,
          ownerToken,
          notificationEmail: projectData.notificationEmail?.trim() || undefined,
        }),
      );
      router.push('/');
    } catch (error: any) {
      // Debug: Show real error from backend
      if (error && error.response && typeof error.response.json === 'function') {
        error.response.json().then((data: any) => {
          alert(JSON.stringify(data, null, 2));
        });
      } else {
        alert(error?.message || String(error));
      }
      console.error("Error submitting project:", error);
    }
  }

  const progress = (state.step / 5) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Project</h1>
          <Progress value={progress} className="w-full max-w-md" />
          <p className="text-sm text-gray-600 mt-2">Step {state.step} of 5</p>
        </div>

        {/* Form Steps */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>
                {state.step === 1 && "What stage is your project at?"}
                {state.step === 2 && "What's your biggest concern right now?"}
                {state.step === 3 && "What do you want to do next?"}
                {state.step === 4 && "Our Recommendation"}
                {state.step === 5 && "Project Details"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {state.step === 1 && (
                <QuestionOne
                  selectedAnswer={state.answers.projectStage}
                  onSelect={(answer) => updateAnswer("projectStage", answer)}
                  onNext={nextStep}
                />
              )}

              {state.step === 2 && (
                <QuestionTwo
                  selectedAnswer={state.answers.biggestConcern}
                  onSelect={(answer) => updateAnswer("biggestConcern", answer)}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}

              {state.step === 3 && (
                <QuestionThree
                  selectedAnswer={state.answers.nextGoal}
                  onSelect={(answer) => updateAnswer("nextGoal", answer)}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}

              {state.step === 4 && (
                <RecommendationStep
                  recommendedType={state.recommendedType!}
                  selectedType={state.selectedType!}
                  onSelectType={selectFeedbackType}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}

              {state.step === 5 && (
                <ProjectSubmissionForm
                  selectedType={state.selectedType!}
                  onSubmit={submitProject}
                  onPrev={prevStep}
                  loading={loading}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
