import  { FormularioPageInicio }  from '../components/FormularioPageInicio';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import SearchMapBox from '../components/SearchMapBox';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN_MAPBOX;

const Inicio = (  ) => {
   
  const [userPosition, setUserPosition] = useState({longitude: 0, latitude:0});
  const [ addCoordinates, setAddCoordinates ] = useState([]);
  const [ distancia, setDistancia ] = useState(null);
  const [duracion, setDuracion ] = useState(null);
  //console.log("Desde selectPosition: ", selectPosition );
  const {0: coords1, 1:coords2} = addCoordinates
  console.log("Coords1: ",coords1)
  console.log("Coords2",coords2)
  /**
   * The function `getPosition` updates the select position with a new value.
   */
  const getPosition = ( { longitude, latitude } ) => {
    //console.log("Nueva posiscion: ",newPosition)
    setAddCoordinates([...addCoordinates, {longitude, latitude}  ])
    setUserPosition( {longitude, latitude});
    //console.log("Nueva posiscion agregada: ",userPosition);
  };

  const calculateDistanceAndTime = ( origin, destination ) => {
    /* Hacer una consulta a la API de Mapbox para calcular la distancia y el tiempo de las coordenadas almacenadas en addCoordinates  */
    origin = coords1
    destination = coords2
    return new Promise((resolve, reject ) => {
      
      const URL_API_MAPBOX = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?access_token=${mapboxgl.accessToken}`

    fetch(URL_API_MAPBOX)
     .then(response => response.json())
     .then(data => {
          console.log(data.routes[0].distance / 1000);
          console.log(data.routes[0].duration / 60);
          setDistancia(data.routes[0].distance);
          setDuracion(data.routes[0].duration / 60 );
          
          resolve(data);
        })
     .catch(error => {
          console.error('Error calculating distance and time:', error);
          reject(error);
        });
    })

  }

  useEffect(() => {
    /* The `useEffect` hook is used to perform side effects in a React component. In this case, the
    `useEffect` hook is being used to save the `addCoordinates` state variable to the browser's local
    storage whenever it changes. */
    localStorage.setItem("coordenadas",JSON.stringify(addCoordinates))
    /* const myValueCoords = localStorage.getItem("coordenadas")
    console.log(myValueCoords); */
    console.log(addCoordinates)
    calculateDistanceAndTime()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addCoordinates]);


  return (
    <>
     <Navbar />
      <main className=" mx-auto">
        <section className='bg-gray-200 relative z-50 md:-mt-14 lg:-mt-10 rounded-lg shadow-md container mx-auto'>  
         <FormularioPageInicio 
         getPosition={getPosition} 
         userPosition={userPosition}
         addCoordinates={addCoordinates}
         />
         
        </section>
        <div className='w-full h-[30rem] relative z-10 -mt-7'>
            <SearchMapBox 
            userPosition={userPosition} 
            setUserLocation={setUserPosition} 
            />
        </div>
      </main>

      <h3>Distancia {distancia} duracion: {duracion}</h3>
    </>
  )
}

export default Inicio;

/* 
const url = `https://api.mapbox.com/directions/v5/directions/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?access_token={YOUR_MAPBOX_ACCESS_TOKEN}&profile=driving`;
*/