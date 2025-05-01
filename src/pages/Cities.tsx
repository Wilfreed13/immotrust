
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Building2, MapPin, Home, Map } from "lucide-react";
import CameroonMap from "@/components/CameroonMap";

// Données des villes du Cameroun
const citiesData = [
  {
    id: "1",
    name: "Douala",
    country: "Cameroun",
    description: "Capitale économique et plus grand port maritime du Cameroun",
    image: "https://images.unsplash.com/photo-1608507777998-7b4de394ccbe?q=80&w=2070&auto=format&fit=crop",
    properties: 96,
    coordinates: [9.7023, 4.0511] as [number, number],
  },
  {
    id: "2",
    name: "Yaoundé",
    country: "Cameroun",
    description: "Capitale politique et administrative du Cameroun",
    image: "https://images.unsplash.com/photo-1612297728955-a0ad12a75df9?q=80&w=2070&auto=format&fit=crop",
    properties: 84,
    coordinates: [11.5021, 3.8480] as [number, number],
  },
  {
    id: "3",
    name: "Kribi",
    country: "Cameroun",
    description: "Célèbre station balnéaire avec des plages magnifiques",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2074&auto=format&fit=crop",
    properties: 45,
    coordinates: [9.9137, 2.9404] as [number, number],
  },
  {
    id: "4",
    name: "Limbé",
    country: "Cameroun",
    description: "Ville côtière connue pour ses plages de sable noir et son jardin botanique",
    image: "https://images.unsplash.com/photo-1652367366263-cbe27d8ace95?q=80&w=2071&auto=format&fit=crop",
    properties: 37,
    coordinates: [9.1849, 4.0214] as [number, number],
  },
  {
    id: "5",
    name: "Bafoussam",
    country: "Cameroun",
    description: "Centre commercial et culturel important de l'Ouest",
    image: "https://images.unsplash.com/photo-1554662392-e1a161135902?q=80&w=2070&auto=format&fit=crop",
    properties: 29,
    coordinates: [10.4135, 5.4764] as [number, number],
  },
  {
    id: "6",
    name: "Buea",
    country: "Cameroun",
    description: "Ville située au pied du mont Cameroun, plus haut sommet d'Afrique de l'Ouest",
    image: "https://images.unsplash.com/photo-1468276868664-fdcc7bcef5de?q=80&w=2070&auto=format&fit=crop",
    properties: 31,
    coordinates: [9.2417, 4.1569] as [number, number],
  },
  {
    id: "7",
    name: "Bamenda",
    country: "Cameroun",
    description: "Capitale de la région du Nord-Ouest et centre culturel",
    image: "https://images.unsplash.com/photo-1518730518541-d0843268c287?q=80&w=2070&auto=format&fit=crop",
    properties: 24,
    coordinates: [10.1467, 5.9631] as [number, number],
  },
  {
    id: "8",
    name: "Garoua",
    country: "Cameroun",
    description: "Principal centre urbain du nord du pays",
    image: "https://images.unsplash.com/photo-1512330905804-1a743d674b60?q=80&w=2080&auto=format&fit=crop",
    properties: 18,
    coordinates: [13.3889, 9.3045] as [number, number],
  },
  {
    id: "9",
    name: "Maroua",
    country: "Cameroun",
    description: "Centre économique et culturel de l'Extrême-Nord",
    image: "https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=2070&auto=format&fit=crop",
    properties: 15,
    coordinates: [14.3257, 10.5914] as [number, number],
  },
];

export default function Cities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState(citiesData);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  useEffect(() => {
    const filtered = citiesData.filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [searchTerm]);

  const handleCityClick = (id: string) => {
    setSelectedCity(id === selectedCity ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-6">Découvrez les villes du Cameroun</h1>
            
            <div className="relative mb-8">
              <Input
                placeholder="Rechercher une ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 h-[400px] rounded-lg shadow-md overflow-hidden">
            <CameroonMap cities={citiesData} selectedCityId={selectedCity} onCitySelect={handleCityClick} />
          </div>
        </div>
        
        {filteredCities.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Aucune ville trouvée</h2>
            <p className="text-muted-foreground">
              Essayez de modifier votre recherche.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCities.map((city) => (
              <Card 
                key={city.id} 
                className={`overflow-hidden transition-all duration-300 ${selectedCity === city.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleCityClick(city.id)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={city.image} 
                    alt={city.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-primary mr-1" />
                    <span className="text-sm text-muted-foreground">{city.country}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{city.name}</h3>
                  <p className="text-muted-foreground mb-4">{city.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Home className="h-4 w-4 mr-1" />
                    <span>{city.properties} propriétés</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.location.href = `/properties?location=${city.name}`}
                  >
                    Explorer les propriétés
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
