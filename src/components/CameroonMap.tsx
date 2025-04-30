
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type City = {
  id: string;
  name: string;
  coordinates: [number, number];
  properties: number;
};

type CameroonMapProps = {
  cities: City[];
  selectedCityId: string | null;
  onCitySelect: (id: string) => void;
};

const CameroonMap = ({ cities, selectedCityId, onCitySelect }: CameroonMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});

  // À remplacer par une vraie clé Mapbox
  const MAPBOX_TOKEN = "pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNsZGFqM3d3ZTBuZGgzcW53ZXF0YTB6dDQifQ.JGQsoFI3W_bFktt0xoE0LA";

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [12.3547, 5.4755], // Centre du Cameroun
      zoom: 5.5,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Ajout des marqueurs pour chaque ville
    cities.forEach(city => {
      // Création de l'élément HTML du marqueur
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>')`;
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.backgroundSize = '100%';
      el.style.cursor = 'pointer';
      
      // Popup pour afficher le nom de la ville et le nombre de propriétés
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<strong>${city.name}</strong><br>${city.properties} propriétés`
      );

      // Création et ajout du marqueur
      const marker = new mapboxgl.Marker(el)
        .setLngLat(city.coordinates)
        .setPopup(popup)
        .addTo(map.current);

      // Ajout d'un événement de clic sur le marqueur
      el.addEventListener('click', () => onCitySelect(city.id));
      
      // Stockage des marqueurs dans une référence pour y accéder plus tard
      markers.current[city.id] = marker;
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Effet pour mettre à jour les marqueurs sélectionnés
  useEffect(() => {
    Object.keys(markers.current).forEach(cityId => {
      const markerEl = markers.current[cityId].getElement();
      
      if (cityId === selectedCityId) {
        markerEl.style.zIndex = '10';
        markerEl.style.transform = 'scale(1.3)';
        markers.current[cityId].togglePopup();
        
        // Centre la carte sur la ville sélectionnée
        const selectedCity = cities.find(c => c.id === selectedCityId);
        if (selectedCity && map.current) {
          map.current.flyTo({
            center: selectedCity.coordinates,
            zoom: 10,
            duration: 2000
          });
        }
      } else {
        markerEl.style.zIndex = '1';
        markerEl.style.transform = 'scale(1)';
      }
    });
  }, [selectedCityId, cities]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default CameroonMap;
