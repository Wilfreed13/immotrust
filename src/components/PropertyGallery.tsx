
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Images } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PropertyGalleryProps {
  title: string;
  images: string[];
}

const PropertyGallery: FC<PropertyGalleryProps> = ({ title, images }) => {
  // Ensure we have enough images (use first image as fallback)
  const allImages = [...images];
  while (allImages.length < 5) {
    allImages.push(images[0] || "/placeholder.svg");
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 mb-8 rounded-xl overflow-hidden">
        <div className="md:col-span-2 md:row-span-2 relative">
          <img 
            src={allImages[0]} 
            alt={title}
            className="w-full h-full object-cover"
            loading="eager"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
              e.currentTarget.onerror = null;
            }}
          />
        </div>
        {allImages.slice(1, 5).map((image, i) => (
          <div key={i} className="hidden md:block">
            <img 
              src={image} 
              alt={`${title} - image ${i+2}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
                e.currentTarget.onerror = null;
              }}
            />
          </div>
        ))}
      </div>

      {/* Mobile version - only show the first image with a gallery button */}
      <div className="md:hidden rounded-xl overflow-hidden relative">
        <img 
          src={allImages[0]} 
          alt={title}
          className="w-full h-64 object-cover"
          loading="eager"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
            e.currentTarget.onerror = null;
          }}
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
          <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto p-0">
            <div className="grid gap-4 p-4">
              {allImages.map((image, i) => (
                <div key={i} className="overflow-hidden rounded-md">
                  <img 
                    src={image} 
                    alt={`${title} - image ${i+1}`}
                    className="w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                      e.currentTarget.onerror = null;
                    }}
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
