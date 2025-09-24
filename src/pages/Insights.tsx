import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Insights = () => {
  const navigate = useNavigate();
  const [iframeError, setIframeError] = useState(false);

  const handleIframeError = () => {
    setIframeError(true);
    // Fallback: redirect to external dashboard in same window
    window.location.href = "https://dashboard-pulse-scan.lovable.app/";
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate("/")}
            className="text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">Data Insights</h1>
            <p className="text-primary-foreground/80 text-sm md:text-base">Professional migration and career analytics dashboard</p>
          </div>
        </div>
      </div>

      {/* Dashboard Container */}
      <div className="container mx-auto px-4 pb-4">
        <div className="bg-gradient-card backdrop-blur-sm border-primary-foreground/10 rounded-lg overflow-hidden shadow-strong">
          {!iframeError ? (
            <iframe 
              src="https://dashboard-pulse-scan.lovable.app/" 
              width="100%" 
              height="calc(100vh - 120px)"
              style={{ 
                border: 'none',
                minHeight: '600px'
              }}
              title="Data Insights Dashboard"
              onError={handleIframeError}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          ) : (
            <div className="flex items-center justify-center h-96 text-primary-foreground">
              <div className="text-center">
                <p className="mb-4">Unable to load dashboard. Redirecting to external dashboard...</p>
                <Button 
                  variant="hero" 
                  onClick={() => window.location.href = "https://dashboard-pulse-scan.lovable.app/"}
                >
                  Open Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;