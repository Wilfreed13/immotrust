
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  Calendar,
  MessageSquare, 
  User, 
  Settings, 
  LogOut,
  Plus,
  Star
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Sample data for demo purposes
const userProfile = {
  name: "Thomas Bernard",
  email: "thomas.bernard@example.com",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
  joined: "2023",
  completeness: 85,
};

const upcomingBookings = [
  {
    id: "1",
    property: {
      id: "1",
      name: "Villa moderne vue sur mer",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop",
      location: "Nice, France"
    },
    checkIn: new Date(2025, 5, 15),
    checkOut: new Date(2025, 5, 22),
    guests: 2,
    totalPrice: 1750,
    status: "confirmed"
  },
  {
    id: "2",
    property: {
      id: "3",
      name: "Chalet de luxe en montagne",
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1974&auto=format&fit=crop",
      location: "Chamonix, France"
    },
    checkIn: new Date(2025, 7, 5),
    checkOut: new Date(2025, 7, 12),
    guests: 4,
    totalPrice: 2240,
    status: "pending"
  }
];

const pastBookings = [
  {
    id: "3",
    property: {
      id: "2",
      name: "Appartement élégant au centre-ville",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      location: "Paris, France"
    },
    checkIn: new Date(2025, 1, 10),
    checkOut: new Date(2025, 1, 15),
    guests: 2,
    totalPrice: 900,
    status: "completed",
    hasReviewed: false
  }
];

const recentMessages = [
  {
    id: "1",
    from: {
      name: "Marie Dupont",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    },
    property: "Villa moderne vue sur mer",
    message: "Bonjour Thomas ! Je voulais juste confirmer votre arrivée pour le 15 juin. Avez-vous besoin d'informations supplémentaires avant votre séjour ?",
    date: new Date(2025, 4, 28),
    unread: true
  },
  {
    id: "2",
    from: {
      name: "Laurent Martin",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
    },
    property: "Appartement élégant au centre-ville",
    message: "Merci pour votre séjour chez nous ! N'hésitez pas à laisser un avis sur votre expérience.",
    date: new Date(2025, 1, 17),
    unread: false
  }
];

const savedProperties = [
  {
    id: "5",
    name: "Loft industriel rénové",
    location: "Lyon, France",
    price: 150,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "7",
    name: "Penthouse avec vue panoramique",
    location: "Cannes, France",
    price: 450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  }
];

const userProperties = [
  {
    id: "10",
    name: "Appartement confortable avec balcon",
    location: "Bordeaux, France",
    price: 120,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2070&auto=format&fit=crop",
    status: "active",
    bookings: 14
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleLogout = () => {
    toast.success("Vous avez été déconnecté avec succès");
    // In a real app, this would handle authentication logout
  };
  
  const handleLeaveReview = (bookingId: string) => {
    toast.success("Merci pour votre avis !");
    // In a real app, this would open a review form
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-64 shrink-0">
          <div className="sticky top-24 bg-card rounded-lg border p-6 space-y-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="font-semibold text-xl">{userProfile.name}</h2>
              <p className="text-muted-foreground text-sm">
                Membre depuis {userProfile.joined}
              </p>
              
              <div className="w-full mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Profil complété</span>
                  <span>{userProfile.completeness}%</span>
                </div>
                <Progress value={userProfile.completeness} className="h-2" />
              </div>
            </div>
            
            <Separator />
            
            <nav>
              <ul className="space-y-2">
                <li>
                  <Button 
                    variant={activeTab === "overview" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Vue d'ensemble
                  </Button>
                </li>
                <li>
                  <Button 
                    variant={activeTab === "bookings" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("bookings")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Réservations
                  </Button>
                </li>
                <li>
                  <Button 
                    variant={activeTab === "messages" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                    {recentMessages.some(msg => msg.unread) && (
                      <Badge variant="destructive" className="ml-auto">
                        {recentMessages.filter(msg => msg.unread).length}
                      </Badge>
                    )}
                  </Button>
                </li>
                <li>
                  <Button 
                    variant={activeTab === "saved" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("saved")}
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Favoris
                  </Button>
                </li>
                <li>
                  <Button 
                    variant={activeTab === "properties" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("properties")}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Mes annonces
                  </Button>
                </li>
                <li>
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </Button>
                </li>
                <li>
                  <Button 
                    variant={activeTab === "settings" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Button>
                </li>
              </ul>
            </nav>
            
            <Separator />
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-muted-foreground"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Se déconnecter
            </Button>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold">Tableau de bord</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upcoming Bookings Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Réservations à venir</CardTitle>
                    <CardDescription>Vos prochains séjours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {upcomingBookings.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingBookings.slice(0, 1).map((booking) => (
                          <div key={booking.id} className="flex gap-4">
                            <img 
                              src={booking.property.image}
                              alt={booking.property.name}
                              className="h-16 w-24 object-cover rounded-md"
                            />
                            <div>
                              <h3 className="font-medium">{booking.property.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {format(booking.checkIn, "d MMM", { locale: fr })} - {format(booking.checkOut, "d MMM yyyy", { locale: fr })}
                              </p>
                              <Badge 
                                variant={booking.status === "confirmed" ? "default" : "secondary"}
                                className="mt-1"
                              >
                                {booking.status === "confirmed" ? "Confirmé" : "En attente"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Vous n'avez pas de réservation à venir.</p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setActiveTab("bookings")}
                    >
                      Voir toutes les réservations
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Messages Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Messages récents</CardTitle>
                    <CardDescription>Communications avec vos hôtes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentMessages.length > 0 ? (
                      <div className="space-y-4">
                        {recentMessages.slice(0, 1).map((message) => (
                          <div key={message.id} className="flex gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={message.from.avatar} />
                              <AvatarFallback>{message.from.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{message.from.name}</h3>
                                {message.unread && (
                                  <Badge variant="destructive" className="h-2 w-2 rounded-full p-0" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {message.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {format(message.date, "d MMM", { locale: fr })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Vous n'avez pas de messages récents.</p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setActiveTab("messages")}
                    >
                      Voir tous les messages
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Saved Properties */}
                <Card>
                  <CardHeader>
                    <CardTitle>Propriétés sauvegardées</CardTitle>
                    <CardDescription>Vos logements favoris</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {savedProperties.length > 0 ? (
                      <div className="space-y-4">
                        {savedProperties.slice(0, 2).map((property) => (
                          <div key={property.id} className="flex gap-4">
                            <img 
                              src={property.image}
                              alt={property.name}
                              className="h-16 w-24 object-cover rounded-md"
                            />
                            <div>
                              <h3 className="font-medium">{property.name}</h3>
                              <p className="text-sm text-muted-foreground">{property.location}</p>
                              <p className="text-sm font-medium">
                                {property.price} € <span className="text-muted-foreground font-normal">/ nuit</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Vous n'avez pas encore enregistré de propriétés.</p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setActiveTab("saved")}
                    >
                      Voir toutes les propriétés sauvegardées
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* My Properties */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mes annonces</CardTitle>
                    <CardDescription>Propriétés que vous proposez à la location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userProperties.length > 0 ? (
                      <div className="space-y-4">
                        {userProperties.map((property) => (
                          <div key={property.id} className="flex gap-4">
                            <img 
                              src={property.image}
                              alt={property.name}
                              className="h-16 w-24 object-cover rounded-md"
                            />
                            <div>
                              <h3 className="font-medium">{property.name}</h3>
                              <p className="text-sm text-muted-foreground">{property.location}</p>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline">{property.bookings} réservations</Badge>
                                <Badge>{property.status === "active" ? "Actif" : "Inactif"}</Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Vous n'avez pas encore ajouté de propriétés.</p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setActiveTab("properties")}
                    >
                      Gérer mes annonces
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
          
          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold">Mes réservations</h1>
              
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="mb-8">
                  <TabsTrigger value="upcoming">À venir</TabsTrigger>
                  <TabsTrigger value="past">Passées</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming" className="animate-fade-in">
                  {upcomingBookings.length > 0 ? (
                    <div className="space-y-6">
                      {upcomingBookings.map((booking) => (
                        <Card key={booking.id}>
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                              <Link to={`/properties/${booking.property.id}`} className="shrink-0">
                                <img 
                                  src={booking.property.image}
                                  alt={booking.property.name}
                                  className="h-48 w-full md:w-60 object-cover rounded-lg"
                                />
                              </Link>
                              <div className="flex-1">
                                <Link to={`/properties/${booking.property.id}`}>
                                  <h3 className="text-xl font-semibold hover:text-primary">
                                    {booking.property.name}
                                  </h3>
                                </Link>
                                <p className="text-muted-foreground">
                                  {booking.property.location}
                                </p>
                                
                                <div className="mt-4 flex flex-col md:flex-row md:items-center gap-y-3 gap-x-6">
                                  <div>
                                    <p className="text-sm font-medium">Dates</p>
                                    <p className="text-muted-foreground">
                                      {format(booking.checkIn, "d MMM", { locale: fr })} - {format(booking.checkOut, "d MMM yyyy", { locale: fr })}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Voyageurs</p>
                                    <p className="text-muted-foreground">{booking.guests} personnes</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Total</p>
                                    <p className="text-muted-foreground">{booking.totalPrice} €</p>
                                  </div>
                                </div>
                                
                                <div className="mt-6 flex items-center justify-between">
                                  <Badge 
                                    variant={booking.status === "confirmed" ? "default" : "secondary"}
                                  >
                                    {booking.status === "confirmed" ? "Confirmé" : "En attente"}
                                  </Badge>
                                  
                                  <div className="flex gap-2">
                                    <Button variant="outline" asChild>
                                      <Link to={`/messages`}>
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Contacter l'hôte
                                      </Link>
                                    </Button>
                                    <Button asChild>
                                      <Link to={`/bookings/${booking.id}`}>
                                        Détails
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h2 className="text-xl font-medium mb-2">Vous n'avez pas de réservations à venir</h2>
                      <p className="text-muted-foreground mb-6">Commencez à explorer des propriétés pour planifier votre prochain séjour</p>
                      <Button asChild>
                        <Link to="/properties">Découvrir des propriétés</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="past" className="animate-fade-in">
                  {pastBookings.length > 0 ? (
                    <div className="space-y-6">
                      {pastBookings.map((booking) => (
                        <Card key={booking.id}>
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                              <Link to={`/properties/${booking.property.id}`} className="shrink-0">
                                <img 
                                  src={booking.property.image}
                                  alt={booking.property.name}
                                  className="h-48 w-full md:w-60 object-cover rounded-lg"
                                />
                              </Link>
                              <div className="flex-1">
                                <Link to={`/properties/${booking.property.id}`}>
                                  <h3 className="text-xl font-semibold hover:text-primary">
                                    {booking.property.name}
                                  </h3>
                                </Link>
                                <p className="text-muted-foreground">
                                  {booking.property.location}
                                </p>
                                
                                <div className="mt-4 flex flex-col md:flex-row md:items-center gap-y-3 gap-x-6">
                                  <div>
                                    <p className="text-sm font-medium">Dates</p>
                                    <p className="text-muted-foreground">
                                      {format(booking.checkIn, "d MMM", { locale: fr })} - {format(booking.checkOut, "d MMM yyyy", { locale: fr })}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Voyageurs</p>
                                    <p className="text-muted-foreground">{booking.guests} personnes</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Total</p>
                                    <p className="text-muted-foreground">{booking.totalPrice} €</p>
                                  </div>
                                </div>
                                
                                <div className="mt-6 flex items-center justify-between">
                                  <Badge variant="outline">Terminé</Badge>
                                  
                                  <div className="flex gap-2">
                                    {!booking.hasReviewed && (
                                      <Button 
                                        onClick={() => handleLeaveReview(booking.id)}
                                        variant="outline"
                                      >
                                        <Star className="h-4 w-4 mr-2" />
                                        Laisser un avis
                                      </Button>
                                    )}
                                    <Button asChild>
                                      <Link to={`/bookings/${booking.id}`}>
                                        Détails
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h2 className="text-xl font-medium mb-2">Vous n'avez pas de réservations passées</h2>
                      <p className="text-muted-foreground mb-6">Une fois que vous aurez effectué un séjour, il apparaîtra ici</p>
                      <Button asChild>
                        <Link to="/properties">Découvrir des propriétés</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold">Messages</h1>
              
              {recentMessages.length > 0 ? (
                <div className="space-y-6">
                  {recentMessages.map((message) => (
                    <Card key={message.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={message.from.avatar} />
                            <AvatarFallback>{message.from.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{message.from.name}</h3>
                                {message.unread && (
                                  <Badge variant="destructive">Nouveau</Badge>
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {format(message.date, "d MMMM yyyy", { locale: fr })}
                              </span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              Re: {message.property}
                            </p>
                            
                            <p className="border-l-4 pl-4 py-1 my-2 italic">
                              {message.message}
                            </p>
                            
                            <div className="mt-4 flex justify-end gap-2">
                              <Button variant="outline" asChild>
                                <Link to={`/properties/${message.id}`}>
                                  Voir le logement
                                </Link>
                              </Button>
                              <Button asChild>
                                <Link to={`/messages/${message.id}`}>
                                  Répondre
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-xl font-medium mb-2">Pas de messages</h2>
                  <p className="text-muted-foreground">
                    Vous n'avez pas encore de conversations avec des hôtes
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Saved Properties Tab */}
          {activeTab === "saved" && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold">Propriétés sauvegardées</h1>
              
              {savedProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedProperties.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <img 
                          src={property.image}
                          alt={property.name}
                          className="w-full h-full object-cover"
                        />
                        <Button 
                          size="icon"
                          variant="ghost"
                          className="absolute top-2 right-2 bg-black/20 text-white hover:bg-black/30 hover:text-white"
                        >
                          <Star className="h-5 w-5 fill-yellow-500" />
                          <span className="sr-only">Retirer des favoris</span>
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{property.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                            <span className="text-sm">{property.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{property.location}</p>
                        <p className="font-medium mt-2">
                          {property.price} € <span className="text-muted-foreground font-normal">/ nuit</span>
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-end">
                        <Button asChild>
                          <Link to={`/properties/${property.id}`}>
                            Voir le détail
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-xl font-medium mb-2">Pas de favoris</h2>
                  <p className="text-muted-foreground mb-6">
                    Vous n'avez pas encore enregistré de propriétés dans vos favoris
                  </p>
                  <Button asChild>
                    <Link to="/properties">Découvrir des propriétés</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* My Properties Tab */}
          {activeTab === "properties" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Mes annonces</h1>
                <Button asChild>
                  <Link to="/properties/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une propriété
                  </Link>
                </Button>
              </div>
              
              {userProperties.length > 0 ? (
                <div className="space-y-6">
                  {userProperties.map((property) => (
                    <Card key={property.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <img 
                            src={property.image}
                            alt={property.name}
                            className="h-48 w-full md:w-60 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-semibold">{property.name}</h3>
                                <p className="text-muted-foreground">{property.location}</p>
                              </div>
                              <Badge variant={property.status === "active" ? "default" : "secondary"}>
                                {property.status === "active" ? "Actif" : "Inactif"}
                              </Badge>
                            </div>
                            
                            <div className="mt-4 flex flex-wrap gap-4">
                              <div>
                                <p className="text-sm font-medium">Prix</p>
                                <p className="text-muted-foreground">
                                  {property.price} € par nuit
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Note</p>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                                  <span>{property.rating}</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Réservations</p>
                                <p className="text-muted-foreground">{property.bookings} totales</p>
                              </div>
                            </div>
                            
                            <div className="mt-6 flex flex-wrap gap-2">
                              <Button asChild variant="outline">
                                <Link to={`/properties/${property.id}/bookings`}>
                                  Réservations
                                </Link>
                              </Button>
                              <Button asChild variant="outline">
                                <Link to={`/properties/${property.id}/edit`}>
                                  Modifier
                                </Link>
                              </Button>
                              <Button asChild>
                                <Link to={`/properties/${property.id}`}>
                                  Voir l'annonce
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl font-medium mb-2">Pas encore d'annonce</h2>
                  <p className="text-muted-foreground mb-6">
                    Commencez à louer votre propriété et gagnez des revenus supplémentaires
                  </p>
                  <Button asChild>
                    <Link to="/properties/add">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une propriété
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold">Mon profil</h1>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
                    <div className="text-center md:text-left">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                        <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" className="mt-4">
                        Changer ma photo
                      </Button>
                    </div>
                    
                    <div className="flex-1 space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Nom complet</h3>
                        <p className="text-lg">{userProfile.name}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                        <p className="text-lg">{userProfile.email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Membre depuis</h3>
                        <p className="text-lg">{userProfile.joined}</p>
                      </div>
                      
                      <div className="pt-4">
                        <Button>Modifier mon profil</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold">Paramètres</h1>
              
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres du compte</CardTitle>
                  <CardDescription>Gérez vos préférences et informations de sécurité</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Mot de passe</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Changez votre mot de passe pour sécuriser votre compte
                    </p>
                    <Button variant="outline">
                      Modifier le mot de passe
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Notifications</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Gérez comment et quand vous recevez des notifications
                    </p>
                    <Button variant="outline">
                      Gérer les notifications
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Informations de paiement</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Gérez vos modes de paiement et vos préférences de facturation
                    </p>
                    <Button variant="outline">
                      Gérer les paiements
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Fermeture de compte</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Supprimez définitivement votre compte et toutes vos données
                    </p>
                    <Button variant="destructive">
                      Supprimer mon compte
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
