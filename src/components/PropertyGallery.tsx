
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Images } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  title: string;
  images: string[];
}

const PropertyGallery: FC<PropertyGalleryProps> = ({ title, images }) => {
  const isMobile = useIsMobile();
  const [failedImages, setFailedImages] = useState<{[key: string]: boolean}>({});
  
  // Images de secours spécifiques au Cameroun
  const fallbackImages = [
    "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?q=80&w=2067&auto=format&fit=crop", // Marché camerounais
    "https://images.unsplash.com/photo-1596448515227-31d01baf5c0e?q=80&w=1974&auto=format&fit=crop", // Plage à Kribi
    "https://images.unsplash.com/photo-1523473827533-2a64d0d36748?q=80&w=2080&auto=format&fit=crop", // Architecture camerounaise
    "https://images.unsplash.com/photo-1504433374832-4fcf45f40967?q=80&w=1972&auto=format&fit=crop", // Paysage camerounais
    "https://images.unsplash.com/photo-1612983133700-739c8f358334?q=80&w=1974&auto=format&fit=crop"  // Montagnes camerounaises
  ];

  // Ensure we have enough images (use first image as fallback)
  const allImages = [...images];
  while (allImages.length < 5) {
    allImages.push(images[0] || fallbackImages[0] || "/placeholder.svg");
  }
  
  const handleImageError = (index: number) => {
    setFailedImages(prev => ({
      ...prev,
      [index]: true
    }));
  };
  
  const getImage = (index: number) => {
    if (failedImages[index]) {
      const fallbackIndex = index % fallbackImages.length;
      return fallbackImages[fallbackIndex] || "/placeholder.svg";
    }
    return allImages[index];
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 mb-8 rounded-xl overflow-hidden">
        <div className="md:col-span-2 md:row-span-2 relative">
          <img 
            src={getImage(0)} 
            alt={title}
            className="w-full h-full object-cover"
            loading="eager"
            onError={() => handleImageError(0)}
          />
        </div>
        {allImages.slice(1, 5).map((_, i) => (
          <div key={i} className="hidden md:block">
            <img 
              src={getImage(i+1)} 
              alt={`${title} - image ${i+2}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => handleImageError(i+1)}
            />
          </div>
        ))}
      </div>

      {/* Mobile version - only show the first image with a gallery button */}
      <div className="md:hidden rounded-xl overflow-hidden relative">
        <img 
          src={getImage(0)} 
          alt={title}
          className="w-full h-64 object-cover"
          loading="eager"
          onError={() => handleImageError(0)}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute bottom-4 right-4 bg-white/80 hover:bg-white text-black flex items-center gap-2"
            >
              <Images className="h-4 w-4" />
              Voir les photos
            </Button>
          </DialogTrigger>
          <DialogContent className={cn(
            "max-w-[90vw] max-h-[90vh] overflow-y-auto p-0",
            isMobile ? "w-[95vw] h-[80vh]" : ""
          )}>
            <div className="grid gap-4 p-4">
              {allImages.map((_, i) => (
                <div key={i} className="overflow-hidden rounded-md">
                  <img 
                    src={getImage(i)} 
                    alt={`${title} - image ${i+1}`}
                    className="w-full object-cover"
                    loading="lazy"
                    onError={() => handleImageError(i)}
                  />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PropertyGallery;
