/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
//import CoordenadasContext from "../context/CoordenadasContext";
import getTimeDistance from '../config/getTimeDistance'

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN_MAPBOX;

export const MapboxContext = createContext({});

// GetRoutesMapBox.jsx
export const GetRoutesMapBox = ( { children } ) => {

  //const { coordenadasIniciales , coordenadasFinales,} = useContext(CoordenadasContext);
  const [totalDistance, setTotalDistance] = useState(null);
  const [totalTiempoRecorrido, setTotalTiempoRecorrido] = useState(null);
  const [loading, setLoading] = useState(false);



useEffect(() => {

    const fetchRoute = async (  ) => {

    //if( !coordenadasIniciales && !coordenadasFinales ) return
    
    /* const [ longitudeStart, latitudeStart ] = coordenadasIniciales;
    const [ longitudeEnd, latitudeEnd ] = coordenadasFinales; */
    
    
      setLoading(true)

      try {

      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${longitudeStart},${latitudeStart};${longitudeEnd},${latitudeEnd}?annotations=maxspeed&overview=full&geometries=geojson&access_token=${mapboxgl.accessToken}`;

        const response = await fetch(url);
        const data = await response.json();

        if( response.status === 200) {
          console.log(data)
          // Calcula la distancia
           
        } else if (await data.routes[0].distance && await data.routes[0].duration) {
           const resultDistance = Number(Math.ceil(await data.routes[0].distance / 1000).toFixed(2));
           console.log(resultDistance)
           
           setTotalDistance(resultDistance)
           const duration = await data.routes[0].duration;
            setTotalTiempoRecorrido(getTimeDistance(duration))
        }

      } catch (error) {
        console.error('Error obteniendo ruta:', error);
      } 

      setLoading(false)

    
     
  
  };
  
  fetchRoute();
        
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [  ]);


 return (
    <MapboxContext.Provider value={{  
    totalDistance, 
    totalTiempoRecorrido,
    setTotalDistance,
    setTotalTiempoRecorrido,
    loading
    }}>
      {children}
    </MapboxContext.Provider>
  );
};

