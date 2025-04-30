
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Building2, MapPin, Home } from "lucide-react";

// Données de démonstration pour les villes du Cameroun
const citiesData = [
  {
    id: "1",
    name: "Douala",
    country: "Cameroun",
    description: "Capitale économique et plus grand port maritime du Cameroun",
    image: "https://images.unsplash.com/photo-1608507777998-7b4de394ccbe?q=80&w=2070&auto=format&fit=crop",
    properties: 96,
  },
  {
    id: "2",
    name: "Yaoundé",
    country: "Cameroun",
    description: "Capitale politique et administrative du Cameroun",
    image: "https://images.unsplash.com/photo-1612297728955-a0ad12a75df9?q=80&w=2070&auto=format&fit=crop",
    properties: 84,
  },
  {
    id: "3",
    name: "Kribi",
    country: "Cameroun",
    description: "Célèbre station balnéaire avec des plages magnifiques",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2074&auto=format&fit=crop",
    properties: 45,
  },
  {
    id: "4",
    name: "Limbé",
    country: "Cameroun",
    description: "Ville côtière connue pour ses plages de sable noir et son jardin botanique",
    image: "https://images.unsplash.com/photo-1652367366263-cbe27d8ace95?q=80&w=2071&auto=format&fit=crop",
    properties: 37,
  },
  {
    id: "5",
    name: "Bafoussam",
    country: "Cameroun",
    description: "Centre commercial et culturel important de l'Ouest",
    image: "https://images.unsplash.com/photo-1554662392-e1a161135902?q=80&w=2070&auto=format&fit=crop",
    properties: 29,
  },
  {
    id: "6",
    name: "Buea",
    country: "Cameroun",
    description: "Ville située au pied du mont Cameroun, plus haut sommet d'Afrique de l'Ouest",
    image: "https://images.unsplash.com/photo-1468276868664-fdcc7bcef5de?q=80&w=2070&auto=format&fit=crop",
    properties: 31,
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
        <h1 className="text-3xl font-bold mb-6">Découvrez les villes du Cameroun</h1>
        
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
