
import { FC } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: number;
  user: string;
  date: string;
  rating: number;
  comment: string;
}

interface PropertyReviewsProps {
  rating: number;
  reviews: number;
  reviewsList: Review[];
}

const PropertyReviews: FC<PropertyReviewsProps> = ({ rating, reviews, reviewsList }) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        <span className="font-semibold text-lg">
          {rating} · {reviews} avis
        </span>
      </div>
      
      <div className="space-y-6">
        {reviewsList.map((review) => (
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
    </>
  );
};

export default PropertyReviews;
