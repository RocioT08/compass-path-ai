import { useState } from "react";
import Hero from "@/components/Hero";
import SurveyForm from "@/components/SurveyForm";
import ResultsDashboard from "@/components/ResultsDashboard";

interface FormData {
  age: string;
  gender: string;
  education: string;
  field: string;
  experience: string;
  yearsInCountry: string;
  languageLevel: string;
  currentlySatisfaction: string;
  barriers: string;
  goals: string;
  timeline: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<"hero" | "survey" | "results">("hero");
  const [surveyData, setSurveyData] = useState<FormData | null>(null);

  const startSurvey = () => {
    setCurrentView("survey");
  };

  const completeSurvey = (data: FormData) => {
    setSurveyData(data);
    setCurrentView("results");
  };

  const resetToHome = () => {
    setCurrentView("hero");
    setSurveyData(null);
  };

  return (
    <div className="min-h-screen">
      {currentView === "hero" && (
        <div onClick={startSurvey}>
          <Hero />
        </div>
      )}
      
      {currentView === "survey" && (
        <SurveyForm onComplete={completeSurvey} />
      )}
      
      {currentView === "results" && surveyData && (
        <ResultsDashboard formData={surveyData} />
      )}
    </div>
  );
};

export default Index;
