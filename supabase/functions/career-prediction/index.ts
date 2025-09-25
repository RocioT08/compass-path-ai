import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Career prediction function called', req.method)
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    console.log('Request body:', body)
    const { surveyData } = body

    // Aquí procesarías los datos con tu modelo
    // Por ahora simulamos la respuesta del modelo
    const prediction = await processCareerPrediction(surveyData)

    return new Response(
      JSON.stringify(prediction),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 400 
      }
    )
  }
})

async function processCareerPrediction(surveyData: any) {
  // Aquí integrarías tu modelo de Python
  // Opción 1: Llamar a una API externa donde tienes tu modelo
  // Opción 2: Recrear la lógica del modelo en TypeScript
  // Opción 3: Usar un servicio de ML como HuggingFace

  // Simulación basada en los datos del survey
  const {
    age,
    education,
    experience,
    yearsInCountry,
    languageLevel,
    emotionalWellbeing,
    networkingLevel
  } = surveyData

  // Algoritmo simplificado basado en tu investigación
  let successProbability = 0.5
  let timelineMonths = 12

  // Factores positivos
  if (education === 'masters' || education === 'phd') successProbability += 0.15
  if (experience >= 5) successProbability += 0.2
  if (yearsInCountry >= 2) successProbability += 0.1
  if (languageLevel >= 4) successProbability += 0.15
  if (emotionalWellbeing >= 4) successProbability += 0.1
  if (networkingLevel >= 3) successProbability += 0.1

  // Factores que afectan timeline
  if (languageLevel < 3) timelineMonths += 6
  if (yearsInCountry < 1) timelineMonths += 4
  if (experience < 2) timelineMonths += 3

  successProbability = Math.min(0.95, Math.max(0.1, successProbability))
  timelineMonths = Math.max(3, Math.min(36, timelineMonths))

  // Generar recomendaciones personalizadas
  const recommendations = generateRecommendations(surveyData, successProbability)

  return {
    successProbability: Math.round(successProbability * 100),
    timelineMonths,
    recommendations,
    profileType: determineProfileType(surveyData)
  }
}

function generateRecommendations(data: any, probability: number) {
  const recommendations = []

  if (data.languageLevel < 4) {
    recommendations.push({
      category: "Idioma",
      priority: "Alta",
      action: "Mejorar nivel de inglés/idioma local",
      resources: ["Cursos de idioma online", "Práctica conversacional", "Certificaciones oficiales"]
    })
  }

  if (data.networkingLevel < 3) {
    recommendations.push({
      category: "Networking",
      priority: "Alta", 
      action: "Expandir red profesional",
      resources: ["LinkedIn optimization", "Eventos de networking", "Asociaciones profesionales"]
    })
  }

  if (data.emotionalWellbeing < 3) {
    recommendations.push({
      category: "Bienestar",
      priority: "Media",
      action: "Apoyo emocional y mental",
      resources: ["Terapia psicológica", "Grupos de apoyo", "Mindfulness y meditación"]
    })
  }

  if (data.experience < 3) {
    recommendations.push({
      category: "Experiencia",
      priority: "Media",
      action: "Ganar experiencia local",
      resources: ["Voluntariado", "Proyectos freelance", "Programas de mentoría"]
    })
  }

  return recommendations
}

function determineProfileType(data: any) {
  if (data.age < 30 && data.experience < 3) {
    return "Joven profesional en desarrollo"
  } else if (data.experience >= 5 && data.languageLevel >= 4) {
    return "Profesional experimentado con ventaja"
  } else if (data.emotionalWellbeing < 3) {
    return "Profesional necesitando apoyo emocional"
  } else {
    return "Profesional en transición"
  }
}