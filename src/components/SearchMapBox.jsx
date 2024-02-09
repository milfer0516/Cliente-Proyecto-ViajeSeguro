/* eslint-disable react/prop-types */
/* longitude: -74.08175,
  latitude: 4.60971, */

import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import 'mapbox-gl/dist/mapbox-gl.css';
//import { FaMapMarkerAlt } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN_MAPBOX;

const SearchMapBox = ({ setUserLocation, userPosition }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [error, setError] = useState('');
  const [lng, setLng] = useState(userPosition.longitude);
  const [lat, setLat] = useState(userPosition.latitude);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation({ longitude, latitude });
        },
        () => {
          setError('Error obteniendo la dirección del usuario');
          console.log('Error obteniendo la dirección del usuario');
        }
      );
    } else {
      setError('Geolocalizacion no es soportada por este Navegador.');
      console.log('Geolocalizacion no es soportada por este Navegador.');
    }
  }, [setUserLocation]);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [userPosition?.longitude, userPosition?.latitude],
        zoom
      });

      map.current.on('load', () => {
        map.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserLocation: true
          })
        );
      });

      map.current.addControl(new mapboxgl.FullscreenControl());
      map.current.addControl(new mapboxgl.NavigationControl());
      map.current.addControl(new mapboxgl.ScaleControl());
      map.current.addControl(new mapboxgl.AttributionControl());
    } else {
      map.current.setCenter([userPosition.longitude, userPosition.latitude]);
    }

    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPosition, setUserLocation ]);

  useEffect(() => {
    if (map) {
      // Event listener to capture map movements
      map.current.on('move', () => {

        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, setUserLocation]);

  return (
    <section >
      <div className="h-[30rem] pt-10" ref={mapContainer}>
        <h2> { !error ? null : error} </h2>
        <div className="text-center text-sm bg-gray-600 text-white w-80 relative z-10 -bottom-[25rem] left-36 pt-2 pb-2">
          Longitude: {lng} | Latitude: {lat} 
        </div>
      </div>
    </section>
  )
};

export default SearchMapBox;

SearchMapBox.propTypes= {
  setUserLocation: PropTypes.func.isRequired,
}