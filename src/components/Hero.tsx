import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, Users, MessageSquare, BarChart3, Target } from "lucide-react";
import heroImage from "@/assets/hero-career-ai.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional AI career development platform"
          className="w-full h-full object-cover opacity-20"
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
              <span className="text-transparent bg-gradient-to-r from-primary-glow to-secondary bg-clip-text"> Migration</span> Journey
            </h1>
            
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Get AI-powered insights into your career prospects, timeline predictions, and personalized recommendations for professional success in your new country.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Start Career Analysis
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                View Success Stories
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
      </div>
    </section>
  );
};

export default Hero;