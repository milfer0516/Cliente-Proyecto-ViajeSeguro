import  { FormularioPageInicio }  from '../components/FormularioPageInicio';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import SearchMapBox from '../components/SearchMapBox';

const Inicio = (  ) => {

  const [ selectPosition, setSelectPosition ] = useState(null);
  //console.log("Desde selectPosition: ", selectPosition );

  /**
   * The function `getPosition` updates the select position with a new value.
   */
  const getPosition = ( { newPosition } ) => {
    
    console.log("Nueva posiscion: ",newPosition)
    setSelectPosition( newPosition )
  }

  return (
    <>
     <Navbar />
      <main className=" mx-auto">
        <section className='bg-gray-200 relative z-50 md:-mt-14 lg:-mt-10 rounded-lg shadow-md container mx-auto'>  
         <FormularioPageInicio getPosition={getPosition} userPosition={selectPosition} />
        </section>
        <div className='w-full h-[30rem] relative z-10 -mt-7'>
            <SearchMapBox setUserLocation={setSelectPosition} />
            
        </div>
      </main>
    </>
  )
}

export default Inicio;