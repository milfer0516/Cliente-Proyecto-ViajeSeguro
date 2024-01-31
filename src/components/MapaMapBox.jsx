//import { useRef, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'mapbox-gl/dist/mapbox-gl.css'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import { CurrentPosition } from './CurrentPosition';
import mapboxgl from 'mapbox-gl';

// Configura el token de acceso de Mapbox GL JS
mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN_MAPBOX;

const SearchMapBox = () => {
  const position = [4.60971 , -74.08175];

  return (
    <MapContainer 
    center={position} 
    zoom={14} 
    scrollWheelZoom={true}
    style={{ width: '100%', height: '100%' }}
    >
         <TileLayer
        attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        id={import.meta.env.VITE_STYLE_ID} // Puedes cambiar el estilo aquí
        tileSize={512}
        zoomOffset={-1}
        accessToken={mapboxgl.accessToken}
        maxZoom={18}
      />
        
      <CurrentPosition />
      
    </MapContainer>
  );
};

export default SearchMapBox;
