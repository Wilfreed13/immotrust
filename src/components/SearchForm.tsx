
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

type SearchFormProps = {
  className?: string;
  isHero?: boolean;
};

export default function SearchForm({ className, isHero = false }: SearchFormProps) {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query parameters
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (propertyType) params.append("type", propertyType);
    if (dateRange.from) params.append("checkin", format(dateRange.from, "yyyy-MM-dd"));
    if (dateRange.to) params.append("checkout", format(dateRange.to, "yyyy-MM-dd"));
    
    // Navigate to properties page with search params
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={cn(
        "flex flex-col md:flex-row gap-4",
        isHero ? "hero-search" : "",
        className
      )}
    >
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Où souhaitez-vous aller?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="flex-1">
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Type de propriété" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Appartement</SelectItem>
            <SelectItem value="house">Maison</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="cabin">Chalet</SelectItem>
            <SelectItem value="loft">Loft</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRange.from && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "P", { locale: fr })} -{" "}
                    {format(dateRange.to, "P", { locale: fr })}
                  </>
                ) : (
                  format(dateRange.from, "P", { locale: fr })
                )
              ) : (
                "Dates du séjour"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <Button type="submit" className="md:w-auto">
        <Search className="mr-2 h-4 w-4" /> Rechercher
      </Button>
    </form>
  );
}
