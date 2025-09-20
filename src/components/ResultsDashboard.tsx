import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Clock, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Lightbulb,
  Target,
  Award,
  Download,
  Share2
} from "lucide-react";

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
}

const ResultsDashboard = ({ formData }: { formData: FormData }) => {
  // Mock AI analysis based on form data
  const analysisResults = {
    successProbability: 78,
    expectedTimelineMonths: 18,
    profileMatch: "Senior STEM Professional with Language Barriers",
    riskFactors: ["Language proficiency", "Local market experience"],
    strengths: ["Strong education", "Relevant experience", "Clear goals"],
    recommendations: [
      {
        category: "Language Development",
        priority: "High",
        action: "Enroll in professional English communication course",
        timeline: "3-6 months"
      },
      {
        category: "Professional Networking", 
        priority: "High",
        action: "Join industry associations and attend networking events",
        timeline: "Ongoing"
      },
      {
        category: "Credential Recognition",
        priority: "Medium",
        action: "Complete credential assessment process",
        timeline: "6-9 months"
      },
      {
        category: "Emotional Support",
        priority: "Medium", 
        action: "Connect with migrant support groups",
        timeline: "1-3 months"
      }
    ]
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">AI Analysis Complete</Badge>
          <h2 className="text-4xl font-bold mb-4">Your Career Intelligence Report</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Based on your profile and our analysis of 1,200+ similar cases, here are your personalized insights
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Key Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Success Probability */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-success" />
                  Career Success Probability
                </CardTitle>
                <CardDescription>
                  Likelihood of achieving your professional goals based on similar profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-success">{analysisResults.successProbability}%</div>
                  <Badge variant="secondary" className="bg-success/10 text-success">High Confidence</Badge>
                </div>
                <Progress value={analysisResults.successProbability} className="mb-4" />
                <p className="text-sm text-muted-foreground">
                  This score is based on analysis of professionals with similar backgrounds, education, and circumstances.
                </p>
              </CardContent>
            </Card>

            {/* Timeline Prediction */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  Expected Timeline to Stabilization
                </CardTitle>
                <CardDescription>
                  Predicted time to achieve professional stability and career goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-primary">{analysisResults.expectedTimelineMonths}</div>
                  <span className="text-lg text-muted-foreground">months</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-semibold">6-12 months</div>
                    <div className="text-sm text-muted-foreground">Initial adjustment</div>
                  </div>
                  <div>
                    <div className="font-semibold">12-18 months</div>
                    <div className="text-sm text-muted-foreground">Career positioning</div>
                  </div>
                  <div>
                    <div className="font-semibold">18+ months</div>
                    <div className="text-sm text-muted-foreground">Professional growth</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Match */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-secondary" />
                  Your Professional Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    {analysisResults.profileMatch}
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-success mb-2">Key Strengths</h4>
                    <ul className="space-y-1">
                      {analysisResults.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Award className="h-4 w-4 text-success" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-warning mb-2">Focus Areas</h4>
                    <ul className="space-y-1">
                      {analysisResults.riskFactors.map((factor, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Target className="h-4 w-4 text-warning" />
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <div className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lightbulb className="h-6 w-6 text-accent" />
                  Action Plan
                </CardTitle>
                <CardDescription>
                  Personalized recommendations for your journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisResults.recommendations.map((rec, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 pb-4 border-b last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{rec.category}</h4>
                      <Badge 
                        variant={rec.priority === "High" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rec.action}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {rec.timeline}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="professional" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Advisor
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Find Peer Network
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsDashboard;