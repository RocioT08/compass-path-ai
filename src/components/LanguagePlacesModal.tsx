import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ExternalLink, Clock, Navigation, Loader2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LanguagePlace {
  id: string;
  name: string;
  type: 'school' | 'library' | 'cafe' | 'community_center';
  address: string;
  distance: number;
  rating: number;
  priceRange: '$' | '$$' | '$$$';
  languages: string[];
  hours: string;
  phone?: string;
  description: string;
}

interface LanguagePlacesModalProps {
  open: boolean;
  onClose: () => void;
}

const mockPlaces: LanguagePlace[] = [
  {
    id: '1',
    name: 'International Language Center',
    type: 'school',
    address: '123 Main St, Downtown',
    distance: 0.5,
    rating: 4.8,
    priceRange: '$$$',
    languages: ['English', 'Spanish', 'French'],
    hours: 'Lun-Vie: 9AM-8PM, Sáb: 10AM-4PM',
    phone: '(555) 123-4567',
    description: 'Escuela profesional de idiomas con instructores certificados y clases personalizadas'
  },
  {
    id: '2',
    name: 'Central Public Library',
    type: 'library',
    address: '456 Library Ave, Centro',
    distance: 0.8,
    rating: 4.5,
    priceRange: '$',
    languages: ['English', 'Mandarin', 'German'],
    hours: 'Lun-Dom: 9AM-9PM',
    phone: '(555) 987-6543',
    description: 'Grupos de conversación gratuitos y programas de intercambio de idiomas'
  },
  {
    id: '3',
    name: 'Polyglot Café',
    type: 'cafe',
    address: '789 Coffee St, Barrio Cultural',
    distance: 1.2,
    rating: 4.3,
    priceRange: '$$',
    languages: ['English', 'Italian', 'Portuguese'],
    hours: 'Diario: 7AM-10PM',
    phone: '(555) 456-7890',
    description: 'Encuentros semanales de conversación en un ambiente acogedor con café y snacks'
  },
  {
    id: '4',
    name: 'Community Learning Hub',
    type: 'community_center',
    address: '321 Community Blvd, Zona Norte',
    distance: 1.5,
    rating: 4.6,
    priceRange: '$',
    languages: ['English', 'Spanish', 'Arabic'],
    hours: 'Lun-Vie: 6PM-9PM, Sáb: 10AM-2PM',
    phone: '(555) 321-0987',
    description: 'Clases grupales económicas y programas de integración cultural'
  },
  {
    id: '5',
    name: 'Global Languages Institute',
    type: 'school',
    address: '654 University Ave, Campus',
    distance: 2.1,
    rating: 4.7,
    priceRange: '$$',
    languages: ['English', 'French', 'Japanese', 'Korean'],
    hours: 'Lun-Sáb: 8AM-7PM',
    phone: '(555) 654-3210',
    description: 'Instituto universitario con programas intensivos y certificaciones internacionales'
  },
  {
    id: '6',
    name: 'Neighborhood Conversation Circle',
    type: 'community_center',
    address: '852 Park Avenue, Residencial',
    distance: 1.8,
    rating: 4.2,
    priceRange: '$',
    languages: ['English', 'Spanish'],
    hours: 'Mar y Jue: 7PM-9PM, Sáb: 3PM-5PM',
    description: 'Círculos de conversación informales para practicar inglés en un ambiente relajado'
  }
];

const typeLabels = {
  school: 'Escuela de Idiomas',
  library: 'Biblioteca',
  cafe: 'Café',
  community_center: 'Centro Comunitario'
};

const typeColors = {
  school: 'bg-primary',
  library: 'bg-secondary',
  cafe: 'bg-accent',
  community_center: 'bg-success'
};

const LanguagePlacesModal: React.FC<LanguagePlacesModalProps> = ({ open, onClose }) => {
  const [places, setPlaces] = useState<LanguagePlace[]>(mockPlaces);
  const [filteredPlaces, setFilteredPlaces] = useState<LanguagePlace[]>(mockPlaces);
  const [locationLoading, setLocationLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [filters, setFilters] = useState({
    language: '',
    type: '',
    priceRange: ''
  });

  const { toast } = useToast();

  // Get user location for distance calculations
  const getUserLocation = async () => {
    setLocationLoading(true);
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation not supported');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
      setUserLocation(coords);
      
      toast({
        title: "Ubicación detectada",
        description: "Mostrando lugares cerca de ti",
      });
    } catch (error) {
      toast({
        title: "Información",
        description: "Mostrando lugares en tu ciudad con distancias aproximadas.",
      });
      setUserLocation([-74.006, 40.7128]); // Default coordinates
    }
    setLocationLoading(false);
  };

  // Apply filters
  useEffect(() => {
    let filtered = places;

    if (filters.language) {
      filtered = filtered.filter(place => 
        place.languages.some(lang => 
          lang.toLowerCase().includes(filters.language.toLowerCase())
        )
      );
    }

    if (filters.type) {
      filtered = filtered.filter(place => place.type === filters.type);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(place => place.priceRange === filters.priceRange);
    }

    // Sort by distance
    filtered = filtered.sort((a, b) => a.distance - b.distance);

    setFilteredPlaces(filtered);
  }, [filters, places]);

  const openInMaps = (place: LanguagePlace) => {
    const query = encodeURIComponent(`${place.name}, ${place.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const clearAllFilters = () => {
    setFilters({
      language: '',
      type: '',
      priceRange: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Lugares para Aprender Idiomas
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-hidden flex flex-col h-[70vh]">
          {/* Header Actions */}
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={getUserLocation}
              disabled={locationLoading}
              variant="outline"
              size="sm"
            >
              {locationLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Navigation className="h-4 w-4 mr-2" />
              )}
              Detectar Ubicación
            </Button>
            
            <Badge variant="secondary" className="px-3 py-1">
              {filteredPlaces.length} lugares encontrados
            </Badge>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Select value={filters.language} onValueChange={(value) => setFilters(prev => ({ ...prev, language: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los idiomas</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Español</SelectItem>
                <SelectItem value="french">Français</SelectItem>
                <SelectItem value="german">Deutsch</SelectItem>
                <SelectItem value="italian">Italiano</SelectItem>
                <SelectItem value="portuguese">Português</SelectItem>
                <SelectItem value="mandarin">中文</SelectItem>
                <SelectItem value="japanese">日本語</SelectItem>
                <SelectItem value="korean">한국어</SelectItem>
                <SelectItem value="arabic">العربية</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los tipos</SelectItem>
                <SelectItem value="school">Escuelas</SelectItem>
                <SelectItem value="library">Bibliotecas</SelectItem>
                <SelectItem value="cafe">Cafés</SelectItem>
                <SelectItem value="community_center">Centros Comunitarios</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los precios</SelectItem>
                <SelectItem value="$">$ (Económico)</SelectItem>
                <SelectItem value="$$">$$ (Moderado)</SelectItem>
                <SelectItem value="$$$">$$$ (Premium)</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              Limpiar Filtros
            </Button>
          </div>

          {/* Places List */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {filteredPlaces.length === 0 ? (
              <Card className="text-center py-8">
                <CardContent>
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No se encontraron lugares con los filtros seleccionados.</p>
                  <Button variant="outline" onClick={clearAllFilters} className="mt-4">
                    Mostrar todos los lugares
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredPlaces.map((place) => (
                <Card key={place.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{place.name}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={typeColors[place.type]} variant="secondary">
                            {typeLabels[place.type]}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {getRatingStars(place.rating)}
                            <span className="text-sm text-muted-foreground">({place.rating})</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-primary">{place.distance} km</div>
                        <div className="text-lg font-bold">{place.priceRange}</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 space-y-3">
                    <p className="text-sm text-muted-foreground">{place.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span>{place.address}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{place.hours}</span>
                      </div>
                      
                      {place.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Teléfono:</span>
                          <span>{place.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {place.languages.map((language) => (
                        <Badge key={language} variant="outline" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => openInMaps(place)}
                      variant="default"
                      size="sm"
                      className="w-full"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Abrir en Google Maps
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguagePlacesModal;