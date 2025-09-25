import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Users, TrendingUp, Clock, MapPin, Building, CheckCircle, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SuccessStory {
  id: string;
  name: string;
  profession: string;
  industry: string;
  country: string;
  avatar: string;
  timeline: string;
  beforeRole: string;
  afterRole: string;
  beforeSalary: string;
  afterSalary: string;
  keyAchievements: string[];
  story: string;
  rating: number;
  completionYear: number;
}

const mockSuccessStories: SuccessStory[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    profession: 'Senior Software Engineer',
    industry: 'Technology',
    country: 'Mexico',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    timeline: '18 months',
    beforeRole: 'Unemployed',
    afterRole: 'Senior Software Engineer at Tech Startup',
    beforeSalary: '$0',
    afterSalary: '$95,000',
    keyAchievements: [
      'Learned advanced React and Node.js',
      'Completed AWS certification',
      'Built 3 portfolio projects',
      'Secured 5 job interviews'
    ],
    story: 'After moving to Canada, I felt lost and overwhelmed. The platform helped me identify exactly what skills I needed to develop and connected me with amazing mentors. The personalized learning path made all the difference!',
    rating: 5,
    completionYear: 2023
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    profession: 'Financial Analyst',
    industry: 'Finance',
    country: 'Egypt',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    timeline: '12 months',
    beforeRole: 'Taxi Driver',
    afterRole: 'Financial Analyst at Major Bank',
    beforeSalary: '$35,000',
    afterSalary: '$78,000',
    keyAchievements: [
      'Obtained CFA Level 1 certification',
      'Completed financial modeling course',
      'Built professional network',
      'Improved English proficiency to C1 level'
    ],
    story: 'I had a finance degree from Egypt but couldn\'t find relevant work. This platform showed me exactly what Canadian employers were looking for and helped me bridge the gap. Now I\'m thriving in my dream role!',
    rating: 5,
    completionYear: 2023
  },
  {
    id: '3',
    name: 'Priya Sharma',
    profession: 'Marketing Manager',
    industry: 'Marketing',
    country: 'India',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    timeline: '15 months',
    beforeRole: 'Marketing Coordinator',
    afterRole: 'Marketing Manager at SaaS Company',
    beforeSalary: '$45,000',
    afterSalary: '$85,000',
    keyAchievements: [
      'Mastered digital marketing tools',
      'Led 3 successful campaigns',
      'Built team of 5 marketers',
      'Increased company revenue by 40%'
    ],
    story: 'The career intelligence helped me understand the Canadian marketing landscape and positioned me for leadership roles. The networking opportunities were invaluable - I met my current manager through a platform event!',
    rating: 5,
    completionYear: 2022
  },
  {
    id: '4',
    name: 'Carlos Mendoza',
    profession: 'Mechanical Engineer',
    industry: 'Engineering',
    country: 'Colombia',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    timeline: '24 months',
    beforeRole: 'Construction Worker',
    afterRole: 'Senior Mechanical Engineer',
    beforeSalary: '$40,000',
    afterSalary: '$105,000',
    keyAchievements: [
      'Obtained P.Eng certification',
      'Completed AutoCAD and SolidWorks training',
      'Led infrastructure project worth $2M',
      'Became team lead for 8 engineers'
    ],
    story: 'Getting my engineering credentials recognized seemed impossible until I found this platform. The step-by-step guidance through the certification process and interview preparation was exceptional.',
    rating: 5,
    completionYear: 2022
  },
  {
    id: '5',
    name: 'Fatima Al-Zahra',
    profession: 'Healthcare Administrator',
    industry: 'Healthcare',
    country: 'Lebanon',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    timeline: '20 months',
    beforeRole: 'Medical Receptionist',
    afterRole: 'Healthcare Operations Manager',
    beforeSalary: '$38,000',
    afterSalary: '$82,000',
    keyAchievements: [
      'Completed healthcare management certification',
      'Implemented new patient care protocols',
      'Reduced wait times by 30%',
      'Managed budget of $5M annually'
    ],
    story: 'This platform helped me transition from front-desk work to healthcare management. The industry insights and professional development resources were exactly what I needed to advance my career.',
    rating: 5,
    completionYear: 2023
  },
  {
    id: '6',
    name: 'Zhang Wei',
    profession: 'Data Scientist',
    industry: 'Technology',
    country: 'China',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
    timeline: '16 months',
    beforeRole: 'Data Entry Clerk',
    afterRole: 'Senior Data Scientist at Fintech',
    beforeSalary: '$42,000',
    afterSalary: '$115,000',
    keyAchievements: [
      'Mastered Python and machine learning',
      'Built predictive models saving $500K annually',
      'Published 2 research papers',
      'Became go-to expert for AI initiatives'
    ],
    story: 'The personalized learning recommendations helped me transition from basic data work to advanced machine learning. The mentorship program connected me with industry leaders who guided my career path.',
    rating: 5,
    completionYear: 2023
  }
];

const industries = [
  { value: 'all', label: 'All Industries' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Healthcare', label: 'Healthcare' }
];

const countries = [
  { value: 'all', label: 'All Countries' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Egypt', label: 'Egypt' },
  { value: 'India', label: 'India' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Lebanon', label: 'Lebanon' },
  { value: 'China', label: 'China' }
];

const timelines = [
  { value: 'all', label: 'All Timelines' },
  { value: '6-12', label: '6-12 months' },
  { value: '12-18', label: '12-18 months' },
  { value: '18-24', label: '18-24 months' },
  { value: '24+', label: '24+ months' }
];

const SuccessStories = () => {
  const [filters, setFilters] = useState({
    industry: 'all',
    country: 'all',
    timeline: 'all'
  });

  const filteredStories = useMemo(() => {
    return mockSuccessStories.filter(story => {
      if (filters.industry !== 'all' && story.industry !== filters.industry) return false;
      if (filters.country !== 'all' && story.country !== filters.country) return false;
      
      if (filters.timeline !== 'all') {
        const timelineMonths = parseInt(story.timeline);
        switch (filters.timeline) {
          case '6-12':
            return timelineMonths >= 6 && timelineMonths <= 12;
          case '12-18':
            return timelineMonths >= 12 && timelineMonths <= 18;
          case '18-24':
            return timelineMonths >= 18 && timelineMonths <= 24;
          case '24+':
            return timelineMonths >= 24;
          default:
            return true;
        }
      }
      
      return true;
    });
  }, [filters]);

  // Calculate success metrics
  const successMetrics = useMemo(() => {
    const avgSalaryIncrease = mockSuccessStories.reduce((acc, story) => {
      const before = parseInt(story.beforeSalary.replace(/[$,]/g, ''));
      const after = parseInt(story.afterSalary.replace(/[$,]/g, ''));
      return acc + ((after - before) / (before || 1)) * 100;
    }, 0) / mockSuccessStories.length;

    const avgTimeline = mockSuccessStories.reduce((acc, story) => {
      return acc + parseInt(story.timeline);
    }, 0) / mockSuccessStories.length;

    return {
      totalUsers: mockSuccessStories.length,
      avgSalaryIncrease: 76,
      avgTimeline: Math.round(avgTimeline),
      satisfactionRate: 98
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Success Stories
          </h1>
          <p className="text-xl text-primary mb-2">Real People, Real Results</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how professionals from around the world have transformed their careers 
            and achieved their dreams with our AI-powered career intelligence platform.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {successMetrics.totalUsers}+
              </div>
              <p className="text-sm text-muted-foreground">Success Stories</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-success mb-2">
                {successMetrics.avgSalaryIncrease}%
              </div>
              <p className="text-sm text-muted-foreground">Avg Salary Increase</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">
                {successMetrics.avgTimeline}mo
              </div>
              <p className="text-sm text-muted-foreground">Avg Timeline</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {successMetrics.satisfactionRate}%
              </div>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Filter Success Stories</CardTitle>
            <CardDescription>
              Find stories that match your background and goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Industry</label>
                <Select 
                  value={filters.industry} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, industry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Country of Origin</label>
                <Select 
                  value={filters.country} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, country: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Timeline</label>
                <Select 
                  value={filters.timeline} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, timeline: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelines.map(timeline => (
                      <SelectItem key={timeline.value} value={timeline.value}>
                        {timeline.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <Card key={story.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={story.avatar} alt={story.name} />
                  <AvatarFallback>
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{story.name}</CardTitle>
                <CardDescription className="text-primary font-medium">
                  {story.profession}
                </CardDescription>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {Array.from({ length: story.rating }, (_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Origin and Timeline */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{story.country}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{story.timeline}</span>
                  </div>
                </div>

                {/* Industry Badge */}
                <div className="flex justify-center">
                  <Badge variant="secondary" className="gap-1">
                    <Building className="h-3 w-3" />
                    {story.industry}
                  </Badge>
                </div>

                {/* Career Progression */}
                <div className="space-y-3">
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Career Transformation</h4>
                  </div>
                  
                  {/* Before */}
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground mb-1">BEFORE</p>
                    <p className="text-sm">{story.beforeRole}</p>
                    <p className="text-sm font-semibold text-muted-foreground">{story.beforeSalary}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>

                  {/* After */}
                  <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                    <p className="text-sm font-medium text-success mb-1">AFTER</p>
                    <p className="text-sm">{story.afterRole}</p>
                    <p className="text-sm font-semibold text-success">{story.afterSalary}</p>
                  </div>
                </div>

                <Separator />

                {/* Key Achievements */}
                <div>
                  <h4 className="font-semibold mb-2 text-center">Key Achievements</h4>
                  <ul className="space-y-1">
                    {story.keyAchievements.slice(0, 3).map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Story */}
                <div>
                  <h4 className="font-semibold mb-2">Their Story</h4>
                  <p className="text-sm text-muted-foreground italic">
                    "{story.story}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredStories.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Success Stories Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more stories
              </p>
              <Button 
                variant="outline" 
                onClick={() => setFilters({ industry: 'all', country: 'all', timeline: 'all' })}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of professionals who have transformed their careers with our platform
          </p>
          <Link to="/">
            <Button size="lg" className="gap-2">
              <TrendingUp className="h-5 w-5" />
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;