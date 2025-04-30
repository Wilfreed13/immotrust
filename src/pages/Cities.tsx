
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Building2, MapPin, Home } from "lucide-react";

// Données de démonstration pour les villes
const citiesData = [
  {
    id: "1",
    name: "Paris",
    country: "France",
    description: "La ville de l'amour et de la lumière",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    properties: 125,
  },
  {
    id: "2",
    name: "Nice",
    country: "France",
    description: "Ville côtière avec vue sur la Méditerranée",
    image: "https://images.unsplash.com/photo-1599723968873-ef389448b0ef?q=80&w=2070&auto=format&fit=crop",
    properties: 78,
  },
  {
    id: "3",
    name: "Lyon",
    country: "France",
    description: "Célèbre pour sa gastronomie et son patrimoine culturel",
    image: "https://images.unsplash.com/photo-1524060484562-619e9d6b6f04?q=80&w=2070&auto=format&fit=crop",
    properties: 64,
  },
  {
    id: "4",
    name: "Bordeaux",
    country: "France",
    description: "Réputée pour ses vignobles et son architecture",
    image: "https://images.unsplash.com/photo-1589378953237-33e63b0b83a9?q=80&w=2071&auto=format&fit=crop",
    properties: 53,
  },
  {
    id: "5",
    name: "Marseille",
    country: "France",
    description: "Port méditerranéen historique",
    image: "https://images.unsplash.com/photo-1589209557834-355282f20b13?q=80&w=2070&auto=format&fit=crop",
    properties: 91,
  },
  {
    id: "6",
    name: "Strasbourg",
    country: "France",
    description: "Célèbre pour son marché de Noël et son architecture germanique",
    image: "https://images.unsplash.com/photo-1577107025610-c8761b84c567?q=80&w=2070&auto=format&fit=crop",
    properties: 42,
  },
];

export default function Cities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState(citiesData);
  
  useEffect(() => {
    const filtered = citiesData.filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [searchTerm]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Découvrez nos destinations</h1>
        
        <div className="relative mb-8">
          <Input
            placeholder="Rechercher une ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md"
          />
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
              <Card key={city.id} className="overflow-hidden">
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
