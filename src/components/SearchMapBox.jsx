/* longitude: -74.08175,
  latitude: 4.60971, */

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN_MAPBOX;
import { Map, Marker } from "react-map-gl";


// eslint-disable-next-line react/prop-types
const SearchMapBox = ( {setUserLocation} ) => {

  const [newUserLocation, setNewUserLocation] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: -74.08175,
    latitude: 4.60971,
    zoom: 14
  });

  useEffect(() => {
      //Obtener la ubucación actual del usuario usando la API de geolocalización del navegador
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

          const { longitude , latitude } = position.coords;
          ///console.log("Ubicacion actual del usuario: ",latitude, longitude)
          setNewUserLocation({ longitude, latitude });
          setViewState({
              ...viewState,
              longitude,
              latitude
            });
            setUserLocation({longitude, latitude});
            console.log(viewState.latitude)
        }, (error) => {
          console.log("Error obteniendo la dirección del usuario",error);
        });
      } else {
        console.log("Geolocalizacion no es soportada por este Navegador.")
      }

 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ ])

  return (
    <Map
      {...viewState}
      mapboxAccessToken={import.meta.env.VITE_ACCESS_TOKEN_MAPBOX}
      onMove={(e) => setViewState(e.viewState)}
      onViewportChange={(viewport) => setViewState(viewport)}
      style={{width: "100%", height: "35rem"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      
    >
      
      {newUserLocation && (
        <Marker
          latitude={newUserLocation.latitude}
          longitude={newUserLocation.longitude}
          offsetLeft={-12}
          offsetTop={-30}
          draggable={true}
        >
          <div className='text-4xl text-indigo-700'>{<FaMapMarkerAlt />}</div>
        </Marker>
      )}
          
    </Map>
  );
};

export default SearchMapBox;
