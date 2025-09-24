import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowLeft, TrendingUp, Users, Globe, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const migrationTrends = [
  { country: "Canada", professionals: 2400, growth: 12 },
  { country: "Australia", professionals: 1800, growth: 8 },
  { country: "Germany", professionals: 1600, growth: 15 },
  { country: "Netherlands", professionals: 1200, growth: 10 },
  { country: "UK", professionals: 1000, growth: 6 },
  { country: "USA", professionals: 3200, growth: 5 }
];

const sectorDemand = [
  { name: "Technology", value: 35, color: "hsl(var(--primary))" },
  { name: "Healthcare", value: 22, color: "hsl(var(--secondary))" },
  { name: "Engineering", value: 18, color: "hsl(var(--accent))" },
  { name: "Finance", value: 15, color: "hsl(var(--success))" },
  { name: "Education", value: 10, color: "hsl(var(--warning))" }
];

const successByRegion = [
  { region: "North America", success: 89, timeMonths: 8 },
  { region: "Europe", success: 85, timeMonths: 12 },
  { region: "Oceania", success: 91, timeMonths: 6 },
  { region: "Asia", success: 78, timeMonths: 14 }
];

const chartConfig = {
  professionals: {
    label: "Professionals",
    color: "hsl(var(--primary))"
  },
  success: {
    label: "Success Rate",
    color: "hsl(var(--secondary))"
  }
};

const Insights = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate("/")}
            className="text-primary-foreground border-primary-foreground/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-primary-foreground mb-2">Platform Insights</h1>
            <p className="text-primary-foreground/80 text-lg">Migration trends and professional success data</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card backdrop-blur-sm border-primary-foreground/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Migrations</CardTitle>
              <Globe className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,200+</div>
              <p className="text-xs text-muted-foreground">+15% from last year</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card backdrop-blur-sm border-primary-foreground/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">Average across all regions</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card backdrop-blur-sm border-primary-foreground/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,500+</div>
              <p className="text-xs text-muted-foreground">Currently on platform</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card backdrop-blur-sm border-primary-foreground/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Timeline</CardTitle>
              <Briefcase className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9.5 months</div>
              <p className="text-xs text-muted-foreground">To career stability</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Migration Trends by Country */}
          <Card className="bg-gradient-card backdrop-blur-sm border-primary-foreground/10">
            <CardHeader>
              <CardTitle>Migration Trends by Country</CardTitle>
              <CardDescription>Professional migration volume and growth rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={migrationTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis 
                      dataKey="country" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="professionals" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Sector Demand */}
          <Card className="bg-gradient-card backdrop-blur-sm border-primary-foreground/10">
            <CardHeader>
              <CardTitle>Most In-Demand Sectors</CardTitle>
              <CardDescription>Professional sectors by demand percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorDemand}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sectorDemand.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm text-muted-foreground">{data.value}% demand</p>
                            </div>
                          );
                        }
                        return null;
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Success by Region */}
          <Card className="bg-gradient-card backdrop-blur-sm border-primary-foreground/10 lg:col-span-2">
            <CardHeader>
              <CardTitle>Success Analysis by Region</CardTitle>
              <CardDescription>Success rates and average timeline to career stability</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={successByRegion}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis 
                      dataKey="region" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <ChartTooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{label}</p>
                              <p className="text-sm text-muted-foreground">
                                Success Rate: {payload[0]?.value}%
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Avg. Timeline: {payload[0]?.payload?.timeMonths} months
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }} 
                    />
                    <Bar 
                      dataKey="success" 
                      fill="hsl(var(--secondary))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Insights;