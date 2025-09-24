import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ExternalLink, Clock, DollarSign, Star, Navigation, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  coordinates: [number, number];
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
    hours: 'Mon-Fri: 9AM-8PM, Sat: 10AM-4PM',
    coordinates: [-74.006, 40.7128],
    description: 'Professional language school with certified instructors'
  },
  {
    id: '2',
    name: 'Central Public Library',
    type: 'library',
    address: '456 Library Ave',
    distance: 0.8,
    rating: 4.5,
    priceRange: '$',
    languages: ['English', 'Mandarin', 'German'],
    hours: 'Mon-Sun: 9AM-9PM',
    coordinates: [-74.008, 40.7135],
    description: 'Free conversation groups and language exchange programs'
  },
  {
    id: '3',
    name: 'Polyglot Café',
    type: 'cafe',
    address: '789 Coffee St',
    distance: 1.2,
    rating: 4.3,
    priceRange: '$$',
    languages: ['English', 'Italian', 'Portuguese'],
    hours: 'Daily: 7AM-10PM',
    coordinates: [-74.010, 40.7142],
    description: 'Weekly conversation meetups in a cozy atmosphere'
  },
  {
    id: '4',
    name: 'Community Learning Hub',
    type: 'community_center',
    address: '321 Community Blvd',
    distance: 1.5,
    rating: 4.6,
    priceRange: '$',
    languages: ['English', 'Spanish', 'Arabic'],
    hours: 'Mon-Fri: 6PM-9PM, Sat: 10AM-2PM',
    coordinates: [-74.012, 40.7150],
    description: 'Affordable group classes and cultural integration programs'
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
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [places, setPlaces] = useState<LanguagePlace[]>(mockPlaces);
  const [filteredPlaces, setFilteredPlaces] = useState<LanguagePlace[]>(mockPlaces);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [mapboxToken, setMapboxToken] = useState('');
  const [filters, setFilters] = useState({
    language: '',
    type: '',
    priceRange: ''
  });

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { toast } = useToast();

  // Get user location
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
        title: "Error de ubicación",
        description: "No se pudo obtener tu ubicación. Usando ubicación por defecto.",
        variant: "destructive"
      });
      setUserLocation([-74.006, 40.7128]); // Default to NYC
    }
    setLocationLoading(false);
  };

  // Initialize map
  useEffect(() => {
    if (!open || !mapContainer.current || !mapboxToken || !userLocation) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: userLocation,
      zoom: 14
    });

    // Add user location marker
    new mapboxgl.Marker({ color: '#3B82F6' })
      .setLngLat(userLocation)
      .setPopup(new mapboxgl.Popup().setHTML('<div><strong>Tu ubicación</strong></div>'))
      .addTo(map.current);

    // Add place markers
    filteredPlaces.forEach((place) => {
      const marker = new mapboxgl.Marker({ color: '#EF4444' })
        .setLngLat(place.coordinates)
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-semibold">${place.name}</h3>
              <p class="text-sm text-gray-600">${place.type}</p>
              <p class="text-sm">${place.address}</p>
            </div>
          `)
        )
        .addTo(map.current);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [open, mapboxToken, userLocation, filteredPlaces]);

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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Language Development Places
          </DialogTitle>
        </DialogHeader>

        {!mapboxToken ? (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Para mostrar el mapa, necesitas un token de Mapbox. Puedes obtener uno gratis en{' '}
              <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                mapbox.com
              </a>
            </p>
            <Input
              placeholder="Pega tu token público de Mapbox aquí"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <Button onClick={getUserLocation} disabled={!mapboxToken}>
              Continuar
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 h-[70vh]">
            {/* Map Section */}
            <div className="space-y-4">
              <div className="flex gap-2">
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
              </div>
              
              <div ref={mapContainer} className="h-full rounded-lg border" />
            </div>

            {/* Places List Section */}
            <div className="space-y-4 overflow-hidden flex flex-col">
              {/* Filters */}
              <div className="grid grid-cols-3 gap-2">
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
                    <SelectItem value="community_center">Centros</SelectItem>
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
              </div>

              {/* Places List */}
              <div className="flex-1 overflow-y-auto space-y-4">
                {filteredPlaces.map((place) => (
                  <Card key={place.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{place.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
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
                          <div className="text-sm font-semibold">{place.distance} km</div>
                          <div className="text-lg">{place.priceRange}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-2">{place.description}</p>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4" />
                          {place.address}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          {place.hours}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {place.languages.map((language) => (
                          <Badge key={language} variant="outline" className="text-xs">
                            {language}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        onClick={() => openInMaps(place)}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Abrir en Google Maps
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LanguagePlacesModal;