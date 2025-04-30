
import { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Star, 
  Users, 
  Home, 
  Bed,
  DoorOpen,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Sample property data for demo
const propertyData = {
  id: "1",
  title: "Villa moderne vue sur mer",
  description: "Superbe villa moderne offrant une vue imprenable sur la mer Méditerranée. Cette propriété exclusive dispose de tout le confort nécessaire pour passer des vacances inoubliables. Avec ses grandes baies vitrées, sa piscine à débordement et sa terrasse spacieuse, vous pourrez profiter pleinement du climat méditerranéen tout en admirant des couchers de soleil spectaculaires.",
  location: "Nice, France",
  price: 250,
  rating: 4.9,
  reviews: 124,
  host: {
    name: "Marie Dupont",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    response_rate: 98,
    joined: "2019"
  },
  guests: 6,
  bedrooms: 3,
  beds: 4,
  bathrooms: 2,
  images: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074&auto=format&fit=crop"
  ],
  amenities: [
    "Vue sur la mer",
    "Piscine privée",
    "Wi-Fi",
    "Climatisation",
    "Cuisine équipée",
    "Parking",
    "Machine à laver",
    "Sèche-linge",
    "Télévision",
    "Terrasse",
    "Barbecue",
    "Jardin"
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
      user: "Jean Martin",
      date: "Mars 2025",
      rating: 5,
      comment: "Séjour parfait ! La villa est magnifique et la vue est à couper le souffle. Nous avons particulièrement apprécié les couchers de soleil depuis la terrasse. Marie est une hôte très attentionnée."
    },
    {
      id: 2,
      user: "Sophie Lefevre",
      date: "Février 2025",
      rating: 5,
      comment: "Une propriété exceptionnelle, exactement comme sur les photos. Très propre et bien équipée. La piscine est superbe et la vue sur la mer est incroyable. Nous reviendrons !"
    },
    {
      id: 3,
      user: "Pierre Dubois",
      date: "Janvier 2025",
      rating: 4,
      comment: "Très belle villa avec une vue magnifique. Quelques petits détails d'équipement à améliorer mais rien qui n'ait gâché notre séjour. L'accueil de Marie était parfait."
    }
  ]
};

export default function PropertyDetail() {
  const { id } = useParams();
  // In a real app, we would fetch the property data based on the ID
  // For demo purposes, we're using static data
  const property = propertyData;
  
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  
  const [guests, setGuests] = useState(1);
  
  const handleReservation = () => {
    if (!dateRange.from || !dateRange.to) {
      toast.error("Veuillez sélectionner les dates de votre séjour");
      return;
    }
    
    // In a real app, this would submit the reservation to an API
    toast.success("Votre demande de réservation a été envoyée !");
  };
  
  const handleContactHost = () => {
    // In a real app, this would open a messaging interface
    toast.success("Votre message a été envoyé à l'hôte");
  };
  
  const totalNights = dateRange.from && dateRange.to 
    ? Math.round((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) 
    : 0;
  
  const totalPrice = property.price * totalNights;
  const serviceFee = Math.round(totalPrice * 0.12);
  const totalWithFees = totalPrice + serviceFee;

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
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 mb-8 rounded-xl overflow-hidden">
          <div className="md:col-span-2 md:row-span-2">
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          {property.images.slice(1, 5).map((image, i) => (
            <div key={i}>
              <img 
                src={image} 
                alt={`${property.title} - image ${i+2}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Property Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between pb-6 border-b">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  Logement entier hébergé par {property.host.name}
                </h2>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>{property.guests} voyageurs</span>
                  <span>•</span>
                  <span>{property.bedrooms} chambres</span>
                  <span>•</span>
                  <span>{property.beds} lits</span>
                  <span>•</span>
                  <span>{property.bathrooms} salles de bain</span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <img 
                  src={property.host.image} 
                  alt={property.host.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                />
              </div>
            </div>
            
            <div className="py-6 border-b">
              <h2 className="text-xl font-semibold mb-4">À propos de ce logement</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {property.description}
              </p>
            </div>
            
            <div className="py-6 border-b">
              <h2 className="text-xl font-semibold mb-4">Ce que propose ce logement</h2>
              <div className="grid grid-cols-2 gap-3">
                {property.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Home className="h-4 w-4 text-primary" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="py-6 border-b">
              <Tabs defaultValue="calendar">
                <TabsList className="mb-6">
                  <TabsTrigger value="calendar">Disponibilités</TabsTrigger>
                  <TabsTrigger value="reviews">Avis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="calendar" className="animate-fade-in">
                  <div className="flex justify-center">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={(date) => 
                        date < new Date() || 
                        property.unavailableDates.some(unavailable => 
                          unavailable.toDateString() === date.toDateString()
                        )
                      }
                      className="rounded-md border shadow p-3 max-w-[calc(100vw-2rem)] md:max-w-none"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="animate-fade-in">
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-lg">
                      {property.rating} · {property.reviews} avis
                    </span>
                  </div>
                  
                  <div className="space-y-6">
                    {property.reviews_list.map((review) => (
                      <div key={review.id} className="pb-6 border-b last:border-none">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium">{review.user}</h3>
                          <span className="text-muted-foreground text-sm">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "h-4 w-4", 
                                i < review.rating 
                                  ? "text-yellow-500 fill-yellow-500" 
                                  : "text-muted-foreground"
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Right Column: Reservation */}
          <div className="w-full lg:w-[380px]">
            <div className="bg-card rounded-xl border shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-semibold">{property.price} € <span className="text-muted-foreground text-sm font-normal">/ nuit</span></span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span>{property.rating}</span>
                  <span className="mx-1">·</span>
                  <span className="text-muted-foreground text-sm">{property.reviews} avis</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="border rounded-t-lg grid grid-cols-2 divide-x">
                  <div className="p-3">
                    <span className="text-sm font-medium">Arrivée</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start p-0 text-left font-normal",
                            !dateRange.from && "text-muted-foreground"
                          )}
                        >
                          {dateRange.from ? (
                            format(dateRange.from, "d MMM", { locale: fr })
                          ) : (
                            "Ajouter"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={setDateRange}
                          disabled={(date) => 
                            date < new Date() || 
                            property.unavailableDates.some(unavailable => 
                              unavailable.toDateString() === date.toDateString()
                            )
                          }
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="p-3">
                    <span className="text-sm font-medium">Départ</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start p-0 text-left font-normal",
                            !dateRange.to && "text-muted-foreground"
                          )}
                        >
                          {dateRange.to ? (
                            format(dateRange.to, "d MMM", { locale: fr })
                          ) : (
                            "Ajouter"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={setDateRange}
                          disabled={(date) => 
                            date < new Date() || 
                            property.unavailableDates.some(unavailable => 
                              unavailable.toDateString() === date.toDateString()
                            )
                          }
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="border border-t-0 rounded-b-lg p-3">
                  <span className="text-sm font-medium">Voyageurs</span>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-sm">
                      {guests} voyageur{guests > 1 ? 's' : ''}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 w-7 p-0"
                        disabled={guests <= 1}
                        onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                      >
                        -
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 w-7 p-0"
                        disabled={guests >= property.guests}
                        onClick={() => setGuests(prev => Math.min(property.guests, prev + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full mb-6" 
                size="lg"
                onClick={handleReservation}
                disabled={!dateRange.from || !dateRange.to}
              >
                Réserver
              </Button>
              
              {totalNights > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>{property.price} € x {totalNights} nuits</span>
                    <span>{totalPrice} €</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Frais de service</span>
                    <span>{serviceFee} €</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <span>{totalWithFees} €</span>
                  </div>
                </div>
              )}
              
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Vous ne serez débité que lorsque l'hôte accepte votre demande
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
