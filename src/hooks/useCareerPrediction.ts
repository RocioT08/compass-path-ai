import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface SurveyData {
  age: number
  gender: string
  education: string
  experience: number
  yearsInCountry: number
  languageLevel: number
  emotionalWellbeing: number
  networkingLevel: number
  currentSituation: string
  goals: string[]
}

export interface CareerPrediction {
  successProbability: number
  timelineMonths: number
  recommendations: Array<{
    category: string
    priority: string
    action: string
    resources: string[]
  }>
  profileType: string
}

export const useCareerPrediction = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getPrediction = async (surveyData: SurveyData): Promise<CareerPrediction | null> => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.functions.invoke('career-prediction', {
        body: { surveyData }
      })

      if (error) throw error

      return data as CareerPrediction
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing prediction')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { getPrediction, loading, error }
}