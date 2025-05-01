import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";

type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  coordinates: [number, number]; // Correctly typed as tuple
  image?: string;
};

type PropertyMapProps = {
  properties: Property[];
};

const PropertyMap = ({ properties }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const navigate = useNavigate();

  // À remplacer par une vraie clé Mapbox
  const MAPBOX_TOKEN = "pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNsZGFqM3d3ZTBuZGgzcW53ZXF0YTB6dDQifQ.JGQsoFI3W_bFktt0xoE0LA";

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: properties.length > 0 ? properties[0].coordinates : [9.7023, 4.0511], // Douala par défaut
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Si on a des propriétés, on calcule les limites pour afficher toutes les propriétés
    if (properties.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      
      properties.forEach(property => {
        bounds.extend(property.coordinates);
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 13
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Effect to update markers when properties change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    properties.forEach(property => {
      // Create price marker element
      const el = document.createElement('div');
      el.className = 'price-marker';
      el.style.backgroundColor = 'white';
      el.style.color = '#111';
      el.style.padding = '6px 10px';
      el.style.borderRadius = '20px';
      el.style.fontWeight = 'bold';
      el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';
      el.style.border = '2px solid #f43f5e';
      el.style.fontSize = '14px';
      el.innerHTML = `${property.price.toLocaleString('fr-FR')} FCFA`;
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div style="width: 200px;">
            ${property.image ? 
              `<img src="${property.image}" alt="${property.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;">` : 
              ''
            }
            <h4 style="font-weight: bold; margin-bottom: 4px;">${property.title}</h4>
            <p style="color: #666; margin-bottom: 6px;">${property.location}</p>
            <p style="font-weight: bold;">${property.price.toLocaleString('fr-FR')} FCFA / nuit</p>
          </div>
        `);

      // Add marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat(property.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      // Add click event to navigate to property detail
      el.addEventListener('click', () => {
        navigate(`/properties/${property.id}`);
      });
      
      markers.current.push(marker);
    });

    // Update map bounds if we have properties
    if (properties.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      
      properties.forEach(property => {
        bounds.extend(property.coordinates);
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 13
      });
    }
  }, [properties, navigate]);

  return <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />;
};

export default PropertyMap;
