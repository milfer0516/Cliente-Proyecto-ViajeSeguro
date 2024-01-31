import  {FormularioPageInicio}  from '../components/FormularioPageInicio';
import Navbar from '../components/Navbar';
import SearchMapBox from '../components/MapaMapBox';
//import { useState } from 'react';


const Inicio = () => {

  return (
    <>
     <Navbar />
      <main className=" mx-auto">
        <section className='bg-gray-200 relative z-50 md:-mt-14 lg:-mt-10 rounded-lg shadow-md container mx-auto'>  
         <FormularioPageInicio  />
        </section>
        <div className='w-full h-[30rem] absolute z-10 -mt-7'>
          <SearchMapBox />
        </div>
      </main>
    </>
  )
}

export default Inicio