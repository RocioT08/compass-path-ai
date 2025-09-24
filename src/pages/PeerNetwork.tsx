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
    origin: 'México',
    experience: '8 años en Canadá',
    bio: 'Ingeniera de software especializada en desarrollo full-stack. Ayudo a otros profesionales latinos a navegar el mercado tecnológico canadiense.',
    linkedIn: 'https://linkedin.com/in/mariagonzalez'
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    title: 'Financial Analyst',
    industry: 'finance',
    location: 'Vancouver, CA',
    origin: 'Egipto',
    experience: '5 años en Canadá',
    bio: 'Analista financiero con experiencia en banca internacional. Mentor para profesionales del Medio Oriente.',
    linkedIn: 'https://linkedin.com/in/ahmedhassan'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    title: 'Marketing Manager',
    industry: 'marketing',
    location: 'Montreal, CA',
    origin: 'India',
    experience: '6 años en Canadá',
    bio: 'Especialista en marketing digital y growth hacking. Fundadora de una comunidad de mujeres profesionales inmigrantes.',
    linkedIn: 'https://linkedin.com/in/priyasharma'
  },
  {
    id: '4',
    name: 'Carlos Mendoza',
    title: 'Mechanical Engineer',
    industry: 'engineering',
    location: 'Calgary, CA',
    origin: 'Colombia',
    experience: '10 años en Canadá',
    bio: 'Ingeniero mecánico en la industria petrolera. Líder de iniciativas de diversidad e inclusión.',
    linkedIn: 'https://linkedin.com/in/carlosmendoza'
  },
  {
    id: '5',
    name: 'Fatima Al-Zahra',
    title: 'Healthcare Administrator',
    industry: 'healthcare',
    location: 'Ottawa, CA',
    origin: 'Líbano',
    experience: '4 años en Canadá',
    bio: 'Administradora de servicios de salud con enfoque en atención multicultural. Voluntaria en organizaciones de apoyo a refugiados.',
    linkedIn: 'https://linkedin.com/in/fatimaalzahra'
  }
];

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Canadian Immigrants in Tech',
    members: 15420,
    description: 'Comunidad para profesionales de tecnología que han migrado a Canadá',
    industry: 'technology',
    linkedInUrl: 'https://linkedin.com/groups/canadian-immigrants-tech'
  },
  {
    id: '2',
    name: 'New Canadians Finance Network',
    members: 8930,
    description: 'Red de profesionales financieros nuevos en Canadá',
    industry: 'finance',
    linkedInUrl: 'https://linkedin.com/groups/new-canadians-finance'
  },
  {
    id: '3',
    name: 'Immigrant Professionals Marketing',
    members: 6750,
    description: 'Grupo para profesionales de marketing que buscan establecerse en Canadá',
    industry: 'marketing',
    linkedInUrl: 'https://linkedin.com/groups/immigrant-marketing-pros'
  },
  {
    id: '4',
    name: 'Engineers Without Borders Canada',
    members: 12100,
    description: 'Ingenieros inmigrantes conectando para oportunidades profesionales',
    industry: 'engineering',
    linkedInUrl: 'https://linkedin.com/groups/engineers-without-borders-ca'
  },
  {
    id: '5',
    name: 'Healthcare Professionals Network Canada',
    members: 9850,
    description: 'Red de profesionales de la salud inmigrantes en Canadá',
    industry: 'healthcare',
    linkedInUrl: 'https://linkedin.com/groups/healthcare-professionals-canada'
  }
];

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Networking Mixer - Nuevos Canadienses',
    date: '2024-02-15',
    time: '18:00',
    location: 'Toronto Tech Hub',
    type: 'presencial',
    industry: 'technology',
    organizer: 'Canadian Immigrants in Tech',
    description: 'Evento de networking para profesionales de tecnología recién llegados a Canadá'
  },
  {
    id: '2',
    title: 'Webinar: Finanzas Personales para Inmigrantes',
    date: '2024-02-20',
    time: '19:00',
    location: 'Online via Zoom',
    type: 'virtual',
    industry: 'finance',
    organizer: 'New Canadians Finance Network',
    description: 'Aprende sobre el sistema financiero canadiense y estrategias de inversión'
  },
  {
    id: '3',
    title: 'Marketing Digital Workshop',
    date: '2024-02-25',
    time: '14:00',
    location: 'Vancouver Convention Center',
    type: 'presencial',
    industry: 'marketing',
    organizer: 'Immigrant Professionals Marketing',
    description: 'Taller práctico sobre tendencias de marketing digital en el mercado canadiense'
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
    description: 'Feria de empleo para ingenieros con empresas líderes en Canadá'
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
    description: 'Sesión informativa sobre licencias y certificaciones médicas en Canadá'
  }
];

const industries = [
  { value: 'all', label: 'Todas las industrias' },
  { value: 'technology', label: 'Tecnología' },
  { value: 'finance', label: 'Finanzas' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'engineering', label: 'Ingeniería' },
  { value: 'healthcare', label: 'Salud' }
];

const locations = [
  { value: 'all', label: 'Todas las ubicaciones' },
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
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
          </Link>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">Red de Profesionales</h1>
            <p className="text-muted-foreground">
              Conecta con profesionales migrantes, únete a comunidades y asiste a eventos de networking
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Industria</label>
                <Select 
                  value={filters.industry} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, industry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar industria" />
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
                <label className="text-sm font-medium mb-2 block">Ubicación</label>
                <Select 
                  value={filters.location} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar ubicación" />
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
              <h2 className="text-xl font-semibold">Profesionales Destacados</h2>
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
                                Conectar
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
                            Origen: {profile.origin}
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
                  Grupos de LinkedIn
                </CardTitle>
                <CardDescription>
                  Comunidades profesionales recomendadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredGroups.slice(0, 3).map((group) => (
                  <div key={group.id} className="border rounded-lg p-3">
                    <h4 className="font-medium text-sm mb-1">{group.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {group.members.toLocaleString()} miembros
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
                  Próximos Eventos
                </CardTitle>
                <CardDescription>
                  Oportunidades de networking
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
                      {event.type === 'virtual' ? 'Virtual' : 'Presencial'}
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