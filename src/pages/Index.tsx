import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";
import PropertyCard from "@/components/PropertyCard";
import { Search as SearchIcon, CalendarIcon, Home } from "lucide-react";

// Sample data for demo purposes
const featuredProperties = [
  {
    id: "1",
    title: "Villa moderne vue sur mer",
    location: "Nice, France",
    price: 250,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop",
    type: "Villa",
    featured: true
  },
  {
    id: "2",
    title: "Appartement élégant au centre-ville",
    location: "Paris, France",
    price: 180,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    type: "Appartement",
    featured: true
  },
  {
    id: "3",
    title: "Chalet de luxe en montagne",
    location: "Chamonix, France",
    price: 320,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1974&auto=format&fit=crop",
    type: "Chalet",
    featured: true
  }
];

const destinations = [
  {
    name: "Paris",
    image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=1974&auto=format&fit=crop",
    properties: 156
  },
  {
    name: "Nice",
    image: "https://images.unsplash.com/photo-1558266231-4dad2f61fcc7?q=80&w=1974&auto=format&fit=crop",
    properties: 93
  },
  {
    name: "Lyon",
    image: "https://images.unsplash.com/photo-1558363525-6dde929f8222?q=80&w=2070&auto=format&fit=crop",
    properties: 72
  },
  {
    name: "Bordeaux",
    image: "https://images.unsplash.com/photo-1608282340550-cb567e8fd4d1?q=80&w=2070&auto=format&fit=crop",
    properties: 64
  }
];

const propertyTypes = [
  {
    type: "Appartement",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
    count: 245
  },
  {
    type: "Maison",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    count: 184
  },
  {
    type: "Villa",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
    count: 98
  },
  {
    type: "Chalet",
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1974&auto=format&fit=crop",
    count: 76
  }
];

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url(https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop)",
            backgroundPosition: "center 30%"
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-36 flex flex-col items-center text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Trouvez votre propriété idéale pour des séjours inoubliables
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mb-12">
            Des milliers de propriétés exceptionnelles vous attendent, choisissez celle qui vous correspond et créez des souvenirs mémorables.
          </p>
          
          <div className="w-full max-w-4xl">
            <SearchForm isHero />
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Propriétés en vedette</h2>
          <Button variant="ghost" asChild>
            <Link to="/properties">Voir toutes les propriétés</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard 
              key={property.id}
              {...property}
              featured
            />
          ))}
        </div>
      </section>
      
      {/* Browse By Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-10">Explorez nos propriétés</h2>
          
          <Tabs defaultValue="destinations" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="destinations">Par destination</TabsTrigger>
                <TabsTrigger value="types">Par type de propriété</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="destinations" className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {destinations.map((destination, index) => (
                  <Link 
                    to={`/properties?location=${destination.name}`}
                    key={index}
                    className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{destination.name}</h3>
                      <p className="text-muted-foreground">{destination.properties} propriétés</p>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="types" className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {propertyTypes.map((type, index) => (
                  <Link 
                    to={`/properties?type=${type.type.toLowerCase()}`}
                    key={index}
                    className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <img 
                        src={type.image} 
                        alt={type.type}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{type.type}</h3>
                      <p className="text-muted-foreground">{type.count} propriétés</p>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title text-center mb-12">Comment ça marche</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
              <SearchIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Recherchez</h3>
            <p className="text-muted-foreground">
              Trouvez la propriété idéale parmi notre sélection exclusive en utilisant nos filtres avancés.
            </p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Réservez</h3>
            <p className="text-muted-foreground">
              Sélectionnez vos dates et réservez instantanément votre séjour en toute sécurité.
            </p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
              <Home className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Profitez</h3>
            <p className="text-muted-foreground">
              Vivez une expérience unique dans le logement de vos rêves et créez des souvenirs inoubliables.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="px-8">
            <Link to="/properties">Découvrir les propriétés</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
