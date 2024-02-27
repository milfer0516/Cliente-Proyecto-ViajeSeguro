/* eslint-disable react/prop-types */
import {  useEffect, useState } from 'react';
import { FaMapMarkerAlt  } from 'react-icons/fa'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN_MAPBOX;

const AddressFinalDestination = ({ query, onSelectPlace, getCoordinates }) => {

  const [geocodingData, setGeocodingData] = useState([]);
  const [showList, setShowList] = useState(true);
  // Define el estado de las coordenadas seleccionadas
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);

   // Obtener los datos de Mapbox al montar o cuando cambie la consulta
  useEffect(() => {
    const fetchDataMapbox = async () => {
      if (query) {
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              query
            )}.json?access_token=${mapboxgl.accessToken}&country=CO&limit=5`
          );
          const data = await response.json();
          if (await data.features && await data.features.length > 0) {
            setGeocodingData(data.features);
          } 
        } catch (error) {
          console.error("Error obteniendo coordenadas:", error);
        }
      }
    };
    fetchDataMapbox();
  }, [query]);


  // Manejar la selección de un lugar
  const handleSelectPlace = (placeIndex) => {
    setShowList(false)
    
    if ( placeIndex >= 0 && placeIndex < geocodingData.length) {

      const selectedPlace = geocodingData[placeIndex];
      const selectedCoordinates = selectedPlace.geometry.coordinates;
      
      // Pass selected coordinates to parent component
      if(onSelectPlace) {
        onSelectPlace(selectedPlace);
        setSelectedCoordinates(selectedCoordinates);
      }

      // Optionally, send coordinates to the `getCoordinates` prop if provided:
      if (getCoordinates) {
        getCoordinates(selectedCoordinates);
      }
    } else {
      console.warn('Invalid place index selected.');
    }
  };
  
  useEffect(() => {
    
  }, [selectedCoordinates])
  

  return (
    <>
      <div className='absolute w-[24rem] '>
          { showList ? (
          <ul className='relative text-white -left-3 -bottom-20 rounded-md z-10 bg-gray-400'>
              {geocodingData.map((place, index) => (
                  <li key={place.id} className='p-2 py-3 border-2 rounded-md'
                  onClick={() => handleSelectPlace(index) }>
                  <div className='flex justify-between w-full rounded-lg'>
                      <div className='flex items-center  w-full '>
                          <FaMapMarkerAlt className='mr-2 w-10' />
                          <p
                        
                          className='text-sm flex flex-1 cursor-pointer' 
                          >{place.place_name} </p>
                          
                      </div>
                      
                  </div>
              </li>
              ))}
          </ul>
          ): null}
      </div>
      
    </>
  );
}

export default AddressFinalDestination;



/*   const fetchRoute = async () => {
  if (start && end ) {

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?annotations=maxspeed&overview=full&geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data); // Handle route data
    } catch (error) {
      console.error("Error al obtener la ruta:", error);
    }
  } else {
    console.error("Error: Valores de coordenadas no válidos.");
  }
};
 */
