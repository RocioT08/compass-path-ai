import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Compass, TrendingUp, Users, MessageSquare, BarChart3, Target } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-migration-horizon.jpg";
import multiculturalTeam from "@/assets/multicultural-team.jpg";
import professionalSuccess from "@/assets/professional-success.jpg";
import cosmopolitanSkyline from "@/assets/cosmopolitan-skyline.jpg";
import networkingCultural from "@/assets/networking-cultural.jpg";
import professionalCitySkyline from "@/assets/professional-city-skyline.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center overflow-hidden">
      {/* Background Image with Blue Overlay */}
      <div className="absolute inset-0">
        <img 
          src={professionalCitySkyline} 
          alt="Professional looking at modern city skyline with tall skyscrapers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-85"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Hero Content with Background */}
          <div className="relative text-center lg:text-left">
            {/* Background Image for Title Only */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <img 
                src={multiculturalTeam} 
                alt="Professional looking at modern city horizon representing migration journey and career opportunities"
                className="w-full h-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
            </div>
            
            {/* Title Content */}
            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 sm:mb-6">
              <Compass className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg" />
              <span className="text-lg sm:text-xl font-bold text-white drop-shadow-lg tracking-wide">AI Pathfinder</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
              Transform Your 
              <span className="text-blue-900 drop-shadow-lg"> Migration</span> Journey
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/90 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Get AI-powered insights into your career prospects, timeline predictions, and personalized recommendations for professional success in your new country.
            </p>

            {/* Responsive Button Layout */}
            <div className="flex flex-col sm:flex-row xl:flex-col 2xl:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
              <Button variant="hero" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-w-0 sm:min-w-[200px]">
                Start Career Analysis
              </Button>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/success-stories" className="flex-1 sm:flex-none">
                  <Button variant="hero" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-w-0 sm:min-w-[180px]">
                    Success Stories
                  </Button>
                </Link>
                <Button variant="hero" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-w-0 sm:min-w-[160px]" onClick={() => window.location.href = '/insights'}>
                  View Insights
                </Button>
              </div>
            </div>

            {/* Responsive Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 text-center max-w-md mx-auto lg:mx-0">
              <div className="text-primary-foreground">
                <div className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold mb-1">89%</div>
                <div className="text-xs sm:text-sm text-primary-foreground/70 leading-tight">Success Rate</div>
              </div>
              <div className="text-primary-foreground">
                <div className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold mb-1">2.5x</div>
                <div className="text-xs sm:text-sm text-primary-foreground/70 leading-tight">Faster Results</div>
              </div>
              <div className="text-primary-foreground">
                <div className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold mb-1">1,200+</div>
                <div className="text-xs sm:text-sm text-primary-foreground/70 leading-tight">Success Stories</div>
              </div>
            </div>
            </div>
          </div>

          {/* Feature Cards - Responsive Layout */}
          <div className="space-y-4 sm:space-y-6 mt-8 lg:mt-0">
            {/* Feature Cards - Responsive Design */}
            <Card className="p-4 sm:p-6 bg-gradient-card backdrop-blur-sm border-primary-foreground/10 shadow-strong">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-primary/20 rounded-lg flex-shrink-0">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Career Trajectory Prediction</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">AI analyzes your profile to predict professional success probability and expected timeline for career stabilization.</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-gradient-card backdrop-blur-sm border-primary-foreground/10 shadow-strong">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-secondary/20 rounded-lg flex-shrink-0">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Personalized Recommendations</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Get tailored advice on language learning, networking, certifications, and emotional well-being based on your unique situation.</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-gradient-card backdrop-blur-sm border-primary-foreground/10 shadow-strong">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-accent/20 rounded-lg flex-shrink-0">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Peer Matching & Support</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Connect with professionals who share similar backgrounds and career journeys for peer support and networking.</p>
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