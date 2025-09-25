import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Brain, Home } from "lucide-react";

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

const SurveyForm = ({ onComplete }: { onComplete: (data: FormData) => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    education: "",
    field: "",
    experience: "",
    yearsInCountry: "",
    languageLevel: "",
    currentlySatisfaction: "",
    barriers: "",
    goals: "",
    timeline: "",
  });

  const totalSteps = 4;
  const progressPercentage = (step / totalSteps) * 100;

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Button variant="hero" size="default" className="shadow-lg" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-primary font-semibold">Career Intelligence Survey</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Share Your Journey</h2>
          <p className="text-muted-foreground text-lg">Help our AI understand your unique situation for personalized insights</p>
        </div>

        <Card className="shadow-strong">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-lg">Step {step} of {totalSteps}</CardTitle>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="mb-4" />
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <CardDescription className="text-lg font-medium text-foreground">Personal Background</CardDescription>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age Range</Label>
                    <Select value={formData.age} onValueChange={(value) => updateField("age", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-25">18-25</SelectItem>
                        <SelectItem value="26-30">26-30</SelectItem>
                        <SelectItem value="31-35">31-35</SelectItem>
                        <SelectItem value="36-40">36-40</SelectItem>
                        <SelectItem value="41-50">41-50</SelectItem>
                        <SelectItem value="50+">Over 50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => updateField("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Highest Education Level</Label>
                  <Select value={formData.education} onValueChange={(value) => updateField("education", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="certificate">Certificate/Diploma</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD/Doctorate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <CardDescription className="text-lg font-medium text-foreground">Professional Experience</CardDescription>
                
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study/Career</Label>
                  <Select value={formData.field} onValueChange={(value) => updateField("field", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stem">STEM (Science, Technology, Engineering, Math)</SelectItem>
                      <SelectItem value="business">Business/Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="arts">Arts/Humanities</SelectItem>
                      <SelectItem value="law">Law/Political Science</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="trades">Skilled Trades</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Professional Experience</Label>
                  <Select value={formData.experience} onValueChange={(value) => updateField("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years (Entry level)</SelectItem>
                      <SelectItem value="2-5">2-5 years (Intermediate)</SelectItem>
                      <SelectItem value="6-10">6-10 years (Senior)</SelectItem>
                      <SelectItem value="10+">10+ years (Expert)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <CardDescription className="text-lg font-medium text-foreground">Migration Context</CardDescription>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearsInCountry">Years in This Country</Label>
                    <Select value={formData.yearsInCountry} onValueChange={(value) => updateField("yearsInCountry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<1">Less than 1 year</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">More than 10 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="languageLevel">Local Language Proficiency (1-5)</Label>
                    <Select value={formData.languageLevel} onValueChange={(value) => updateField("languageLevel", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Basic</SelectItem>
                        <SelectItem value="2">2 - Elementary</SelectItem>
                        <SelectItem value="3">3 - Intermediate</SelectItem>
                        <SelectItem value="4">4 - Advanced</SelectItem>
                        <SelectItem value="5">5 - Native/Fluent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="satisfaction">Current Professional Satisfaction (1-5)</Label>
                  <Select value={formData.currentlySatisfaction} onValueChange={(value) => updateField("currentlySatisfaction", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Rate your satisfaction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Very Dissatisfied</SelectItem>
                      <SelectItem value="2">2 - Dissatisfied</SelectItem>
                      <SelectItem value="3">3 - Neutral</SelectItem>
                      <SelectItem value="4">4 - Satisfied</SelectItem>
                      <SelectItem value="5">5 - Very Satisfied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <CardDescription className="text-lg font-medium text-foreground">Goals & Challenges</CardDescription>
                
                <div className="space-y-2">
                  <Label htmlFor="barriers">Main Barriers to Career Development</Label>
                  <Textarea 
                    id="barriers"
                    value={formData.barriers}
                    onChange={(e) => updateField("barriers", e.target.value)}
                    placeholder="Describe your main challenges (e.g., language, networking, credential recognition, etc.)"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Career Goals</Label>
                  <Textarea 
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => updateField("goals", e.target.value)}
                    placeholder="What are your specific career goals? (e.g., get promoted, change industries, start a business)"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Expected Timeline</Label>
                  <Select value={formData.timeline} onValueChange={(value) => updateField("timeline", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="When do you hope to achieve your goals?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-months">Within 6 months</SelectItem>
                      <SelectItem value="1-year">Within 1 year</SelectItem>
                      <SelectItem value="1-2-years">1-2 years</SelectItem>
                      <SelectItem value="2-3-years">2-3 years</SelectItem>
                      <SelectItem value="3-5-years">3-5 years</SelectItem>
                      <SelectItem value="5+-years">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={step === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button 
                variant="hero"
                onClick={nextStep}
              >
                {step === totalSteps ? "Get AI Analysis" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SurveyForm;