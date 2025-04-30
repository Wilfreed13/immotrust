
import { FC } from "react";
import { Home } from "lucide-react";

interface PropertyDetailsProps {
  description: string;
  amenities: string[];
  host: {
    name: string;
    image: string;
  };
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

const PropertyDetails: FC<PropertyDetailsProps> = ({ 
  description, 
  amenities, 
  host, 
  guests, 
  bedrooms, 
  beds, 
  bathrooms 
}) => {
  return (
    <>
      <div className="flex items-start justify-between pb-6 border-b">
        <div>
          <h2 className="text-xl font-semibold mb-1">
            Logement entier hébergé par {host.name}
          </h2>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>{guests} voyageurs</span>
            <span>•</span>
            <span>{bedrooms} chambres</span>
            <span>•</span>
            <span>{beds} lits</span>
            <span>•</span>
            <span>{bathrooms} salles de bain</span>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <img 
            src={host.image} 
            alt={host.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
          />
        </div>
      </div>
      
      <div className="py-6 border-b">
        <h2 className="text-xl font-semibold mb-4">À propos de ce logement</h2>
        <p className="text-muted-foreground whitespace-pre-line">
          {description}
        </p>
      </div>
      
      <div className="py-6 border-b">
        <h2 className="text-xl font-semibold mb-4">Ce que propose ce logement</h2>
        <div className="grid grid-cols-2 gap-3">
          {amenities.map((amenity, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Home className="h-4 w-4 text-primary" />
              </div>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
