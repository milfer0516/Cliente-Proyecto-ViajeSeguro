import { FormularioPageInicio } from '../components/FormularioPageInicio';
import Navbar from '../components/Navbar';
import MapaMapBox from '../components/MapaMapBox';
import { useState } from 'react';


const Inicio = () => {

  const [searchedLocation, setSearchedLocation] = useState(null);

    const handleSearchLocation = (coordinates) => {
        setSearchedLocation(coordinates);
    };

  return (
    <>
     <Navbar />
      <main className=" mx-auto">
        <section className='bg-gray-200 relative z-50 md:-mt-14 lg:-mt-10 rounded-lg shadow-md container mx-auto'>  
         <FormularioPageInicio onSearchLocation={handleSearchLocation} />
        </section>
        <div className='bg-black h-[30rem] w-full -mt-8'>
          <MapaMapBox searchedLocation={searchedLocation}  />
        </div>
      </main>
    </>
  )
}

export default Inicio