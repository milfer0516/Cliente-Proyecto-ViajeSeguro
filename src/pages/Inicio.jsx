import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { FaRecycle } from "react-icons/fa6";
import getTimeDistance from '../config/getTimeDistance';
import  { FormularioPageInicio }  from '../components/FormularioPageInicio';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import SearchMapBox from '../components/SearchMapBox';
import ModalPageInicio from '../components/ModalPageInicio';


mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN_MAPBOX;

const Inicio = (  ) => {
   
  const [userPosition, setUserPosition] = useState({ longitude: 0, latitude: 0 });
  const [ addCoordinates, setAddCoordinates ] = useState([]);
  const [ distancia, setDistancia ] = useState(null);
  const [duracion, setDuracion ] = useState({ horas: 0, minutos: 0 });
  /**
   * The function `getPosition` updates the select position with a new value.
   */
  const getPosition = (positionData = {}) => {
  const { longitude = 0, latitude = 0 } = positionData;

  setAddCoordinates([...addCoordinates, { longitude, latitude }]);
  setUserPosition({ longitude, latitude });
};


  const calculateDistanceAndTime = async (  ) => {
    /* Hacer una consulta a la API de Mapbox para calcular la distancia y el tiempo de las coordenadas almacenadas en addCoordinates  */
    
    if( addCoordinates.length >= 2 && userPosition ) {
        //console.log("Coordenadas desde Inicio: ",addCoordinates);   
        const [ coords1, coords2 ] = addCoordinates
        console.log("Coordenadas desde Inicio1: ",coords1)
        console.log("Coordenadas desde Inicio2: ",coords2)
      try {
        const { data } = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${coords1.longitude},${coords1.latitude};${coords2.longitude},${coords2.latitude}`, {
          params: {
            access_token: mapboxgl.accessToken
          }
        });

        if (await data.routes[0].distance >=2) {
          //console.log( data );
            const distance = Math.ceil(data.routes[0].distance / 1000).toFixed(2);
            const timeInSecounds = data.routes[0].duration
            const { horas, minutos }  = getTimeDistance(timeInSecounds);
            console.log(`Duracion: ${horas}:${minutos}`)
            setDuracion({horas, minutos})
            console.log(distance)
            setDistancia(distance)
        } else {
          console.log("No se encontraron rutas");
        }

      } catch (error) {
        console.error('Error calculating distance and time:', error);
      }
    } 

  };

  const handleReset = () => {
      // Clear all relevant data during reset
      setAddCoordinates([]);
      setDistancia(null);
      setDuracion({ horas: 0, minutos: 0 });
      //setUserPosition({ longitude: 0, latitude: 0 });
      // Consider resetting userPosition if you want a truly fresh start
      // 

      // Use console logs to verify reset behavior
      console.log("addCoordinates after reset:", addCoordinates);
      console.log("distancia after reset:", distancia);
      console.log("duracion after reset:", duracion);
  };

  useEffect(() => {
    /* The `useEffect` hook is used to perform side effects in a React component. In this case, the
    `useEffect` hook is being used to save the `addCoordinates` state variable to the browser's local
    storage whenever it changes. */
    calculateDistanceAndTime();
    if(!userPosition && !addCoordinates) {
      console.log("Se booraron con exito los coordenadas", addCoordinates);
      handleReset();

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addCoordinates]);


  return (
    <>
     <Navbar />
      <ModalPageInicio />
      <main className=" mx-auto relative z-0">
        <section className='bg-gray-200 relative z-50 md:-mt-14 lg:-mt-10 rounded-lg shadow-md container mx-auto'>  
         <FormularioPageInicio 
         getPosition={getPosition} 
         userPosition={userPosition}
         addCoordinates={addCoordinates}
         calculateTime={duracion}
         calculateDistance={distancia}
         />

        <button 
            onClick={handleReset} 
            type="button" className="absolute py-3 px-7 border-2 rounded-md poi bg-amarillo-mostaza text-gray-200 mt-[7rem]" ><span className='text-xl'> {<FaRecycle />} </span>
        </button>
        </section>
        <div className='w-full h-[30rem] relative z-10 -mt-7'>
            <SearchMapBox 
            userPosition={userPosition} 
            setUserLocation={setUserPosition} 
            />
        </div>
      </main>
      
    </>
  )
}

export default Inicio;

/* 
const url = `https://api.mapbox.com/directions/v5/directions/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?access_token={YOUR_MAPBOX_ACCESS_TOKEN}&profile=driving`;
*/