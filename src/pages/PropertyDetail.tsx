
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Star, MessageSquare } from "lucide-react";
import { DateRange } from "react-day-picker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyReviews from "@/components/PropertyReviews";
import PropertyAvailability from "@/components/PropertyAvailability";
import PropertyReservation from "@/components/PropertyReservation";

// Sample property data for demo - Updated for Douala, Cameroon
const propertyData = {
  id: "1",
  title: "Villa luxueuse à Bonanjo",
  description: "Magnifique villa située dans le quartier prestigieux de Bonanjo à Douala. Cette propriété exceptionnelle offre un cadre de vie luxueux avec une architecture contemporaine et des finitions haut de gamme. Idéalement située près du fleuve Wouri, elle bénéficie d'une vue imprenable et d'un accès facile au centre des affaires.",
  location: "Bonanjo, Douala, Cameroun",
  price: 150000,
  rating: 4.8,
  reviews: 87,
  host: {
    name: "Jean-Paul Mbarga",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    response_rate: 96,
    joined: "2020"
  },
  guests: 8,
  bedrooms: 4,
  beds: 6,
  bathrooms: 3,
  images: [
    "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=2080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
  ],
  amenities: [
    "Piscine privée",
    "Wi-Fi haut débit",
    "Climatisation",
    "Cuisine équipée",
    "Parking sécurisé",
    "Système de sécurité 24/7",
    "Générateur électrique",
    "Jardin tropical",
    "Terrasse",
    "Salle de sport",
    "Service de ménage quotidien",
    "Chauffeur privé (en option)"
  ],
  unavailableDates: [
    new Date(2025, 4, 15),
    new Date(2025, 4, 16),
    new Date(2025, 4, 17),
    new Date(2025, 4, 20),
    new Date(2025, 4, 21),
    new Date(2025, 4, 22),
  ],
  reviews_list: [
    {
      id: 1,
      user: "Alain Tchinda",
      date: "Mars 2025",
      rating: 5,
      comment: "Une villa extraordinaire avec un service impeccable. L'emplacement à Bonanjo est parfait, proche de tout mais dans un environnement calme et sécurisé. Je recommande vivement pour les séjours d'affaires ou en famille."
    },
    {
      id: 2,
      user: "Sophie Kemegni",
      date: "Février 2025",
      rating: 4,
      comment: "Excellent séjour dans cette villa spacieuse et bien entretenue. Le personnel est attentif et professionnel. Seul petit bémol, quelques coupures d'électricité malgré le générateur. Heureusement, elles ont été de courte durée."
    },
    {
      id: 3,
      user: "Patrick Mballa",
      date: "Janvier 2025",
      rating: 5,
      comment: "Une expérience inoubliable à Douala. La villa est encore plus belle que sur les photos. Le quartier de Bonanjo est très agréable, avec ses restaurants et sa proximité du fleuve. Je reviendrai certainement!"
    }
  ]
};

export default function PropertyDetail() {
  const { id } = useParams();
  // In a real app, we would fetch the property data based on the ID
  // For demo purposes, we're using static data
  const property = propertyData;
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  const handleContactHost = () => {
    // In a real app, this would open a messaging interface
    toast.success("Votre message a été envoyé à l'hôte");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-1 fill-yellow-500" />
              <span className="font-medium">{property.rating}</span>
              <span className="mx-1">·</span>
              <span className="text-muted-foreground underline">{property.reviews} avis</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-muted-foreground mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-2">
            <Button variant="outline" size="sm" onClick={handleContactHost}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contacter l'hôte
            </Button>
          </div>
        </div>
        
        {/* Image Gallery */}
        <PropertyGallery title={property.title} images={property.images} />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Property Details */}
          <div className="flex-1">
            <PropertyDetails 
              description={property.description}
              amenities={property.amenities}
              host={property.host}
              guests={property.guests}
              bedrooms={property.bedrooms}
              beds={property.beds}
              bathrooms={property.bathrooms}
            />
            
            <div className="py-6 border-b">
              <Tabs defaultValue="calendar">
                <TabsList className="mb-6">
                  <TabsTrigger value="calendar">Disponibilités</TabsTrigger>
                  <TabsTrigger value="reviews">Avis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="calendar" className="animate-fade-in">
                  <PropertyAvailability 
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    unavailableDates={property.unavailableDates}
                  />
                </TabsContent>
                
                <TabsContent value="reviews" className="animate-fade-in">
                  <PropertyReviews 
                    rating={property.rating}
                    reviews={property.reviews}
                    reviewsList={property.reviews_list}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Right Column: Reservation */}
          <div className="w-full lg:w-[380px]">
            <PropertyReservation
              price={property.price}
              rating={property.rating}
              reviews={property.reviews}
              guests={1}
              maxGuests={property.guests}
              dateRange={dateRange}
              setDateRange={setDateRange}
              unavailableDates={property.unavailableDates}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
