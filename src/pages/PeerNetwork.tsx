import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Users, Calendar, ExternalLink, ArrowLeft, MapPin, Building, User, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

interface Profile {
  id: string;
  name: string;
  title: string;
  industry: string;
  location: string;
  origin: string;
  experience: string;
  bio: string;
  avatar?: string;
  linkedIn?: string;
}

interface Group {
  id: string;
  name: string;
  members: number;
  description: string;
  industry: string;
  linkedInUrl: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'virtual' | 'presencial';
  industry: string;
  organizer: string;
  description: string;
}

const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'María González',
    title: 'Senior Software Engineer',
    industry: 'technology',
    location: 'Toronto, CA',
    origin: 'Mexico',
    experience: '8 years in Canada',
    bio: 'Software engineer specialized in full-stack development. I help other Latino professionals navigate the Canadian tech market.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    linkedIn: 'https://linkedin.com/in/mariagonzalez'
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    title: 'Financial Analyst',
    industry: 'finance',
    location: 'Vancouver, CA',
    origin: 'Egypt',
    experience: '5 years in Canada',
    bio: 'Financial analyst with international banking experience. Mentor for Middle Eastern professionals.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    linkedIn: 'https://linkedin.com/in/ahmedhassan'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    title: 'Marketing Manager',
    industry: 'marketing',
    location: 'Montreal, CA',
    origin: 'India',
    experience: '6 years in Canada',
    bio: 'Digital marketing and growth hacking specialist. Founder of an immigrant women professionals community.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    linkedIn: 'https://linkedin.com/in/priyasharma'
  },
  {
    id: '4',
    name: 'Carlos Mendoza',
    title: 'Mechanical Engineer',
    industry: 'engineering',
    location: 'Calgary, CA',
    origin: 'Colombia',
    experience: '10 years in Canada',
    bio: 'Mechanical engineer in the oil industry. Leader of diversity and inclusion initiatives.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    linkedIn: 'https://linkedin.com/in/carlosmendoza'
  },
  {
    id: '5',
    name: 'Fatima Al-Zahra',
    title: 'Healthcare Administrator',
    industry: 'healthcare',
    location: 'Ottawa, CA',
    origin: 'Lebanon',
    experience: '4 years in Canada',
    bio: 'Healthcare services administrator with focus on multicultural care. Volunteer in refugee support organizations.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    linkedIn: 'https://linkedin.com/in/fatimaalzahra'
  }
];

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Canadian Immigrants in Tech',
    members: 15420,
    description: 'Community for technology professionals who have migrated to Canada',
    industry: 'technology',
    linkedInUrl: 'https://linkedin.com/groups/canadian-immigrants-tech'
  },
  {
    id: '2',
    name: 'New Canadians Finance Network',
    members: 8930,
    description: 'Network of finance professionals new to Canada',
    industry: 'finance',
    linkedInUrl: 'https://linkedin.com/groups/new-canadians-finance'
  },
  {
    id: '3',
    name: 'Immigrant Professionals Marketing',
    members: 6750,
    description: 'Group for marketing professionals looking to establish themselves in Canada',
    industry: 'marketing',
    linkedInUrl: 'https://linkedin.com/groups/immigrant-marketing-pros'
  },
  {
    id: '4',
    name: 'Engineers Without Borders Canada',
    members: 12100,
    description: 'Immigrant engineers connecting for professional opportunities',
    industry: 'engineering',
    linkedInUrl: 'https://linkedin.com/groups/engineers-without-borders-ca'
  },
  {
    id: '5',
    name: 'Healthcare Professionals Network Canada',
    members: 9850,
    description: 'Network of immigrant healthcare professionals in Canada',
    industry: 'healthcare',
    linkedInUrl: 'https://linkedin.com/groups/healthcare-professionals-canada'
  }
];

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Networking Mixer - New Canadians',
    date: '2024-02-15',
    time: '18:00',
    location: 'Toronto Tech Hub',
    type: 'presencial',
    industry: 'technology',
    organizer: 'Canadian Immigrants in Tech',
    description: 'Networking event for technology professionals newly arrived in Canada'
  },
  {
    id: '2',
    title: 'Webinar: Personal Finance for Immigrants',
    date: '2024-02-20',
    time: '19:00',
    location: 'Online via Zoom',
    type: 'virtual',
    industry: 'finance',
    organizer: 'New Canadians Finance Network',
    description: 'Learn about the Canadian financial system and investment strategies'
  },
  {
    id: '3',
    title: 'Digital Marketing Workshop',
    date: '2024-02-25',
    time: '14:00',
    location: 'Vancouver Convention Center',
    type: 'presencial',
    industry: 'marketing',
    organizer: 'Immigrant Professionals Marketing',
    description: 'Hands-on workshop on digital marketing trends in the Canadian market'
  },
  {
    id: '4',
    title: 'Engineering Career Fair',
    date: '2024-03-01',
    time: '10:00',
    location: 'Calgary Stampede Grounds',
    type: 'presencial',
    industry: 'engineering',
    organizer: 'Engineers Without Borders Canada',
    description: 'Job fair for engineers with leading Canadian companies'
  },
  {
    id: '5',
    title: 'Healthcare Licensing Session',
    date: '2024-03-05',
    time: '16:00',
    location: 'Online via Teams',
    type: 'virtual',
    industry: 'healthcare',
    organizer: 'Healthcare Professionals Network Canada',
    description: 'Information session on medical licenses and certifications in Canada'
  }
];

const industries = [
  { value: 'all', label: 'All Industries' },
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'healthcare', label: 'Healthcare' }
];

const locations = [
  { value: 'all', label: 'All Locations' },
  { value: 'toronto', label: 'Toronto' },
  { value: 'vancouver', label: 'Vancouver' },
  { value: 'montreal', label: 'Montreal' },
  { value: 'calgary', label: 'Calgary' },
  { value: 'ottawa', label: 'Ottawa' }
];

const PeerNetwork = () => {
  const [filters, setFilters] = useState({
    industry: 'all',
    location: 'all'
  });

  const filteredProfiles = mockProfiles.filter(profile => {
    if (filters.industry !== 'all' && profile.industry !== filters.industry) return false;
    if (filters.location !== 'all' && !profile.location.toLowerCase().includes(filters.location)) return false;
    return true;
  });

  const filteredGroups = mockGroups.filter(group => {
    return filters.industry === 'all' || group.industry === filters.industry;
  });

  const filteredEvents = mockEvents.filter(event => {
    return filters.industry === 'all' || event.industry === filters.industry;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="hero" 
            size="default" 
            className="shadow-lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Analysis
          </Button>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">Professional Network</h1>
            <p className="text-muted-foreground">
              Connect with migrant professionals, join communities and attend networking events
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select 
                  value={filters.location} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location.value} value={location.value}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profiles Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Featured Professionals</h2>
              <Badge variant="secondary">{filteredProfiles.length}</Badge>
            </div>
            
            <div className="space-y-4">
              {filteredProfiles.map((profile) => (
                <Card key={profile.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback>
                          {profile.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{profile.name}</h3>
                            <p className="text-sm text-muted-foreground">{profile.title}</p>
                          </div>
                          {profile.linkedIn && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4 mr-2" />
                                Connect
                              </a>
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline">
                            <MapPin className="h-3 w-3 mr-1" />
                            {profile.location}
                          </Badge>
                          <Badge variant="outline">
                            <Building className="h-3 w-3 mr-1" />
                            {industries.find(i => i.value === profile.industry)?.label}
                          </Badge>
                          <Badge variant="secondary">
                            Origin: {profile.origin}
                          </Badge>
                          <Badge variant="secondary">
                            {profile.experience}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{profile.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar with Groups and Events */}
          <div className="space-y-6">
            {/* LinkedIn Groups */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  LinkedIn Groups
                </CardTitle>
                <CardDescription>
                  Recommended professional communities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredGroups.slice(0, 3).map((group) => (
                  <div key={group.id} className="border rounded-lg p-3">
                    <h4 className="font-medium text-sm mb-1">{group.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {group.members.toLocaleString()} members
                      </Badge>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={group.linkedInUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>
                  Networking opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="border rounded-lg p-3">
                    <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(event.date).toLocaleDateString('es-ES')} - {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    <Badge 
                      variant={event.type === 'virtual' ? 'secondary' : 'default'} 
                      className="text-xs mb-2"
                    >
                      {event.type === 'virtual' ? 'Virtual' : 'In-Person'}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerNetwork;