
import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type PropertyCardProps = {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  type: string;
  className?: string;
  featured?: boolean;
  coordinates?: [number, number]; // Typed as tuple
};

export default function PropertyCard({
  id,
  title,
  location,
  price,
  rating,
  image,
  type,
  className,
  featured = false,
}: PropertyCardProps) {
  return (
    <Link 
      to={`/properties/${id}`} 
      className={cn(
        "property-card block relative",
        featured ? "bg-card" : "",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="aspect-[4/3]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
              e.currentTarget.onerror = null;
            }}
          />
        </div>
        <Badge variant="secondary" className="absolute top-3 left-3">
          {type}
        </Badge>
        {featured && (
          <Badge variant="default" className="absolute top-3 right-3">
            Recommandé
          </Badge>
        )}
      </div>
      <div className={cn("p-4", featured ? "border-x border-b rounded-b-lg" : "")}>
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-lg line-clamp-1 text-left">{title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center mt-2 text-muted-foreground text-sm text-left">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
        <div className="mt-4 text-left">
          <p className="font-semibold">
            {price.toLocaleString('fr-FR')} FCFA <span className="text-muted-foreground font-normal text-sm">/ nuit</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
