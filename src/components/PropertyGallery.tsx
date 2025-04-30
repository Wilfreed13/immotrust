
import { FC } from "react";

interface PropertyGalleryProps {
  title: string;
  images: string[];
}

const PropertyGallery: FC<PropertyGalleryProps> = ({ title, images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 mb-8 rounded-xl overflow-hidden">
      <div className="md:col-span-2 md:row-span-2">
        <img 
          src={images[0]} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      {images.slice(1, 5).map((image, i) => (
        <div key={i}>
          <img 
            src={image} 
            alt={`${title} - image ${i+2}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyGallery;
