
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MapPin, Home, CalendarIcon, Sliders, Search as SearchIcon, X, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider as SliderComponent } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import PropertyMap from "@/components/PropertyMap";

// Sample data for Cameroon properties
const allProperties = [
  {
    id: "1",
    title: "Villa luxueuse à Bonanjo",
    location: "Douala, Cameroun",
    price: 150000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=2070&auto=format&fit=crop",
    type: "Villa",
    coordinates: [9.6917, 4.0480] as [number, number]
  },
  {
    id: "2",
    title: "Appartement moderne à Bonapriso",
    location: "Douala, Cameroun",
    price: 85000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    type: "Appartement",
    coordinates: [9.7020, 4.0570] as [number, number]
  },
  {
    id: "3",
    title: "Maison coloniale rénovée à Akwa",
    location: "Douala, Cameroun",
    price: 120000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1974&auto=format&fit=crop",
    type: "Maison",
    coordinates: [9.7068, 4.0601] as [number, number]
  },
  {
    id: "4",
    title: "Studio équipé à Deido",
    location: "Douala, Cameroun",
    price: 45000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
    type: "Studio",
    coordinates: [9.7195, 4.0826] as [number, number]
  },
  {
    id: "5",
    title: "Villa au bord du Wouri",
    location: "Douala, Cameroun",
    price: 180000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    type: "Villa",
    coordinates: [9.6807, 4.0658] as [number, number]
  },
  {
    id: "6",
    title: "Appartement avec vue sur la cathédrale",
    location: "Yaoundé, Cameroun",
    price: 75000,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
    type: "Appartement",
    coordinates: [11.5174, 3.8721] as [number, number]
  },
  {
    id: "7",
    title: "Penthouse de luxe à Bastos",
    location: "Yaoundé, Cameroun",
    price: 250000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    type: "Appartement",
    coordinates: [11.5037, 3.8831] as [number, number]
  },
  {
    id: "8",
    title: "Villa avec piscine à Kribi",
    location: "Kribi, Cameroun",
    price: 200000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
    type: "Villa",
    coordinates: [9.9137, 2.9404] as [number, number]
  },
  {
    id: "9",
    title: "Bungalow face à la mer",
    location: "Limbé, Cameroun",
    price: 120000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?q=80&w=2070&auto=format&fit=crop",
    type: "Maison",
    coordinates: [9.1849, 4.0214] as [number, number]
  }
];

const amenities = [
  "Wi-Fi", "Piscine", "Climatisation", "Cuisine équipée", 
  "Parking", "Générateur électrique", "Télévision", "Terrasse"
];

export default function Properties() {
  const location = useLocation();
  const [filters, setFilters] = useState({
    location: "",
    type: "all",
    priceRange: [0, 300000],
    dates: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
    amenities: [] as string[],
  });
  
  const [properties, setProperties] = useState(allProperties);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [showMap, setShowMap] = useState(false);
  
  // Set initial filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    const newFilters = { ...filters };
    if (params.get("location")) newFilters.location = params.get("location") || "";
    if (params.get("type")) newFilters.type = params.get("type") || "all";
    if (params.get("checkin") && params.get("checkout")) {
      newFilters.dates = {
        from: params.get("checkin") ? new Date(params.get("checkin") || "") : undefined,
        to: params.get("checkout") ? new Date(params.get("checkout") || "") : undefined,
      };
    }
    
    setFilters(newFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  
  // Apply filters
  useEffect(() => {
    let filtered = [...allProperties];
    
    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Apply type filter
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter(property => 
        property.type.toLowerCase() === filters.type.toLowerCase()
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(property => 
      property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
    );
    
    // Apply amenities filter (for demo purpose, just reduce results when amenities are selected)
    if (filters.amenities.length > 0) {
      // For demo, just show fewer results when amenities are selected
      const amountToShow = Math.max(3, allProperties.length - filters.amenities.length * 2);
      filtered = filtered.slice(0, amountToShow);
    }
    
    // Count active filters
    let count = 0;
    if (filters.location) count++;
    if (filters.type !== "all") count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 300000) count++;
    if (filters.dates.from && filters.dates.to) count++;
    if (filters.amenities.length > 0) count++;
    setActiveFiltersCount(count);
    
    setProperties(filtered);
  }, [filters]);
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, location: e.target.value });
  };
  
  const handleTypeChange = (value: string) => {
    setFilters({ ...filters, type: value });
  };
  
  const handlePriceChange = (value: number[]) => {
    setFilters({ ...filters, priceRange: [value[0] || 0, value[1] || 300000] });
  };
  
  const handleDatesChange = (range: DateRange | undefined) => {
    setFilters({ 
      ...filters, 
      dates: {
        from: range?.from,
        to: range?.to
      }
    });
  };
  
  const toggleAmenity = (amenity: string) => {
    const amenities = [...filters.amenities];
    const index = amenities.indexOf(amenity);
    
    if (index === -1) {
      amenities.push(amenity);
    } else {
      amenities.splice(index, 1);
    }
    
    setFilters({ ...filters, amenities });
  };
  
  const resetFilters = () => {
    setFilters({
      location: "",
      type: "all",
      priceRange: [0, 300000],
      dates: {
        from: undefined,
        to: undefined,
      },
      amenities: [],
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Top filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Destination"
              value={filters.location}
              onChange={handleLocationChange}
              className="pl-9"
            />
          </div>
          
          <div className="w-full lg:w-[200px]">
            <Select value={filters.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Type de propriété" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="appartement">Appartement</SelectItem>
                <SelectItem value="maison">Maison</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full lg:w-auto flex justify-between items-center"
              >
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {filters.dates.from ? (
                    filters.dates.to ? (
                      <>
                        {format(filters.dates.from, "P", { locale: fr })} -{" "}
                        {format(filters.dates.to, "P", { locale: fr })}
                      </>
                    ) : (
                      format(filters.dates.from, "P", { locale: fr })
                    )
                  ) : (
                    "Dates"
                  )}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={filters.dates.from}
                selected={{
                  from: filters.dates.from,
                  to: filters.dates.to
                }}
                onSelect={handleDatesChange}
                numberOfMonths={2}
                className={cn("p-3")}
              />
            </PopoverContent>
          </Popover>
          
          {/* Mobile: Sheet for filters / Desktop: Popover for price */}
          <div className="lg:hidden w-full">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres
                  </div>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                
                <div className="py-6">
                  <div className="mb-8">
                    <h3 className="font-medium mb-4">Prix par nuit (FCFA)</h3>
                    <div className="px-2">
                      <SliderComponent
                        defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                        max={300000}
                        step={5000}
                        onValueChange={handlePriceChange}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span>{filters.priceRange[0].toLocaleString('fr-FR')} FCFA</span>
                      <span>{filters.priceRange[1].toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-medium mb-4">Équipements</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`amenity-${amenity}`}
                            checked={filters.amenities.includes(amenity)}
                            onCheckedChange={() => toggleAmenity(amenity)}
                          />
                          <label
                            htmlFor={`amenity-${amenity}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={resetFilters}>
                      Réinitialiser
                    </Button>
                    <SheetClose asChild>
                      <Button>Appliquer</Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Desktop: Price Filter */}
          <div className="hidden lg:block">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Sliders className="h-4 w-4 mr-2" />
                  Prix
                  {(filters.priceRange[0] > 0 || filters.priceRange[1] < 300000) && (
                    <Badge variant="secondary" className="ml-2">1</Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="p-2">
                  <h3 className="font-medium mb-4">Prix par nuit (FCFA)</h3>
                  <SliderComponent
                    defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                    max={300000}
                    step={5000}
                    onValueChange={handlePriceChange}
                  />
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span>{filters.priceRange[0].toLocaleString('fr-FR')} FCFA</span>
                    <span>{filters.priceRange[1].toLocaleString('fr-FR')} FCFA</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Desktop: Amenities Filter */}
          <div className="hidden lg:block">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Équipements
                  {filters.amenities.length > 0 && (
                    <Badge variant="secondary" className="ml-2">{filters.amenities.length}</Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="p-2">
                  <h3 className="font-medium mb-4">Équipements</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`desktop-amenity-${amenity}`}
                          checked={filters.amenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <label
                          htmlFor={`desktop-amenity-${amenity}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {(activeFiltersCount > 0) && (
            <Button 
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={resetFilters}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Effacer les filtres</span>
            </Button>
          )}

          {/* Toggle Map View */}
          <Button 
            variant="outline" 
            className="ml-auto" 
            onClick={() => setShowMap(!showMap)}
          >
            {showMap ? "Afficher la liste" : "Afficher la carte"}
          </Button>
        </div>
        
        {/* Active filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.location && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.location}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => setFilters({ ...filters, location: "" })}
                />
              </Badge>
            )}
            
            {filters.type !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.type}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => setFilters({ ...filters, type: "all" })}
                />
              </Badge>
            )}
            
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 300000) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.priceRange[0].toLocaleString('fr-FR')} - {filters.priceRange[1].toLocaleString('fr-FR')} FCFA
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => setFilters({ ...filters, priceRange: [0, 300000] })}
                />
              </Badge>
            )}
            
            {filters.dates.from && filters.dates.to && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {format(filters.dates.from, "P", { locale: fr })} - {format(filters.dates.to, "P", { locale: fr })}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => setFilters({ 
                    ...filters, 
                    dates: { from: undefined, to: undefined } 
                  })}
                />
              </Badge>
            )}
            
            {filters.amenities.map(amenity => (
              <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                {amenity}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => toggleAmenity(amenity)}
                />
              </Badge>
            ))}
            
            <Button 
              variant="ghost"
              size="sm"
              className="text-xs h-7"
              onClick={resetFilters}
            >
              Effacer tout
            </Button>
          </div>
        )}
        
        {/* Results */}
        <div>
          <h1 className="text-2xl font-bold mb-6">
            {properties.length} propriétés{" "}
            {filters.location && `à ${filters.location}`}
          </h1>
          
          {properties.length === 0 ? (
            <div className="py-20 text-center">
              <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Aucune propriété trouvée</h2>
              <p className="text-muted-foreground mb-6">
                Essayez de modifier vos filtres pour trouver ce que vous cherchez.
              </p>
              <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
            </div>
          ) : showMap ? (
            <div className="h-[70vh] rounded-lg overflow-hidden mb-8">
              <PropertyMap properties={properties} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard 
                  key={property.id}
                  {...property}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
