
import { FC, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PropertyReservationProps {
  price: number;
  rating: number;
  reviews: number;
  guests: number;
  maxGuests: number;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  unavailableDates: Date[];
}

const PropertyReservation: FC<PropertyReservationProps> = ({
  price,
  rating,
  reviews,
  guests: initialGuests,
  maxGuests,
  dateRange,
  setDateRange,
  unavailableDates,
}) => {
  const [guests, setGuests] = useState(initialGuests);
  
  const handleReservation = () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Veuillez sélectionner les dates de votre séjour");
      return;
    }
    
    // In a real app, this would submit the reservation to an API
    toast.success("Votre demande de réservation a été envoyée !");
  };
  
  const totalNights = dateRange?.from && dateRange?.to 
    ? Math.round((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) 
    : 0;
  
  const totalPrice = price * totalNights;
  const serviceFee = Math.round(totalPrice * 0.12);
  const totalWithFees = totalPrice + serviceFee;

  return (
    <div className="bg-card rounded-xl border shadow-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-semibold">{price.toLocaleString('fr-FR')} FCFA <span className="text-muted-foreground text-sm font-normal">/ nuit</span></span>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
          <span>{rating}</span>
          <span className="mx-1">·</span>
          <span className="text-muted-foreground text-sm">{reviews} avis</span>
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
                    !dateRange?.from && "text-muted-foreground"
                  )}
                >
                  {dateRange?.from ? (
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
                    unavailableDates.some(unavailable => 
                      unavailable.toDateString() === date.toDateString()
                    )
                  }
                  initialFocus
                  className="p-3 pointer-events-auto"
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
                    !dateRange?.to && "text-muted-foreground"
                  )}
                >
                  {dateRange?.to ? (
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
                    unavailableDates.some(unavailable => 
                      unavailable.toDateString() === date.toDateString()
                    )
                  }
                  initialFocus
                  className="p-3 pointer-events-auto"
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
                disabled={guests >= maxGuests}
                onClick={() => setGuests(prev => Math.min(maxGuests, prev + 1))}
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
        disabled={!dateRange?.from || !dateRange?.to}
      >
        Réserver
      </Button>
      
      {totalNights > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{price.toLocaleString('fr-FR')} FCFA x {totalNights} nuits</span>
            <span>{totalPrice.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Frais de service</span>
            <span>{serviceFee.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>{totalWithFees.toLocaleString('fr-FR')} FCFA</span>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-muted-foreground text-center">
        Vous ne serez débité que lorsque l'hôte accepte votre demande
      </div>
    </div>
  );
};

export default PropertyReservation;
