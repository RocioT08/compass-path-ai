import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, Users, MessageSquare, BarChart3, Target } from "lucide-react";
import heroImage from "@/assets/hero-migration-horizon.jpg";
import multiculturalTeam from "@/assets/multicultural-team.jpg";
import professionalSuccess from "@/assets/professional-success.jpg";
import cosmopolitanSkyline from "@/assets/cosmopolitan-skyline.jpg";
import networkingCultural from "@/assets/networking-cultural.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional looking at modern city horizon representing migration journey and career opportunities"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <Brain className="h-8 w-8 text-primary-glow" />
              <span className="text-lg font-semibold text-primary-foreground/80">AI Career Intelligence</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Transform Your 
              <span className="text-primary"> Migration</span> Journey
            </h1>
            
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Get AI-powered insights into your career prospects, timeline predictions, and personalized recommendations for professional success in your new country.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Start Career Analysis AI and ML
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                View Success Stories
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" onClick={() => window.location.href = '/insights'}>
                Insights Our Data
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="text-primary-foreground">
                <div className="text-3xl font-bold mb-1">89%</div>
                <div className="text-sm text-primary-foreground/70">Success Rate</div>
              </div>
              <div className="text-primary-foreground">
                <div className="text-3xl font-bold mb-1">2.5x</div>
                <div className="text-sm text-primary-foreground/70">Faster Results</div>
              </div>
              <div className="text-primary-foreground">
                <div className="text-3xl font-bold mb-1">1,200+</div>
                <div className="text-sm text-primary-foreground/70">Success Stories</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary-foreground/10 shadow-strong">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Career Trajectory Prediction</h3>
                  <p className="text-muted-foreground">AI analyzes your profile to predict professional success probability and expected timeline for career stabilization.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary-foreground/10 shadow-strong">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/20 rounded-lg">
                  <Target className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Personalized Recommendations</h3>
                  <p className="text-muted-foreground">Get tailored advice on language learning, networking, certifications, and emotional well-being based on your unique situation.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary-foreground/10 shadow-strong">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Peer Matching & Support</h3>
                  <p className="text-muted-foreground">Connect with professionals who share similar backgrounds and career journeys for peer support and networking.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Emotional Images Grid */}
        <div className="container mx-auto px-4 mt-20 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="group overflow-hidden rounded-lg shadow-strong hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <img 
                src={multiculturalTeam}
                alt="Diverse multicultural team working together in professional environment"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="group overflow-hidden rounded-lg shadow-strong hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <img 
                src={professionalSuccess}
                alt="Professional celebrating career success and achievement"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="group overflow-hidden rounded-lg shadow-strong hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <img 
                src={cosmopolitanSkyline}
                alt="Modern cosmopolitan city skyline representing new opportunities"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="group overflow-hidden rounded-lg shadow-strong hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <img 
                src={networkingCultural}
                alt="Professional networking and cultural exchange event"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;