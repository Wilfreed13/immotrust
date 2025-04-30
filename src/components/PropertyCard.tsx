
import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PropertyCardProps = {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  type: string;
  className?: string;
  featured?: boolean;
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
        "property-card block",
        featured ? "bg-card" : "",
        className
      )}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover rounded-t-lg"
        />
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
          <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center mt-2 text-muted-foreground text-sm">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{location}</span>
        </div>
        <div className="mt-4">
          <p className="font-semibold">
            {price.toLocaleString('fr-FR')} € <span className="text-muted-foreground font-normal text-sm">/ nuit</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
