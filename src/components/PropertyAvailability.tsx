
import { FC } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { useIsMobile } from "@/hooks/use-mobile";

interface PropertyAvailabilityProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  unavailableDates: Date[];
}

const PropertyAvailability: FC<PropertyAvailabilityProps> = ({ 
  dateRange, 
  setDateRange, 
  unavailableDates 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex justify-center flex-wrap">
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={isMobile ? 1 : 2}
        disabled={(date) => 
          date < new Date() || 
          unavailableDates.some(unavailable => 
            unavailable.toDateString() === date.toDateString()
          )
        }
        className="rounded-md border shadow p-3 max-w-[calc(100vw-2rem)] md:max-w-none pointer-events-auto"
      />
    </div>
  );
};

export default PropertyAvailability;
