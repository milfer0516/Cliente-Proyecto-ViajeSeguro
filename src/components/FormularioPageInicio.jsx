/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt, FaBus, FaPlusCircle } from 'react-icons/fa';
import { FaLocationArrow } from "react-icons/fa6";
import GetGeocodingMapBox from '../api/GetGeocodingMapBox';
import AddressCurrentPosition from '../api/AddressCurrentPosition';
import Categorias  from '../api/Categorias';

export const FormularioPageInicio = ( { getPosition, userPosition, calculateTime, calculateDistance } ) => {

    const [inputValue, setInputValue] = useState('');
    const [destinoFinal, setDestinoFinal] = useState('');
    const [categoria, setCategoria] = useState('');
     const [showList, setShowList] = useState({ inputValue: false, destinoFinal: false }); 
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [geocodingData, setGeocodingData] = useState([]);

    /* `const {horas, minutos} = calculateTime` is destructuring the `calculateTime` object and
    assigning the values of its properties `horas` and `minutos` to the variables `horas` and
    `minutos` respectively. This allows you to access the values of `horas` and `minutos` directly
    without having to use `calculateTime.horas` and `calculateTime.minutos`. */
    const {horas, minutos} = calculateTime
    const longitude = userPosition?.longitude ?? 0;
    const latitude = userPosition?.latitude ?? 0;


   const handleOptionChange = (e) => {
        e.preventDefault();
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
        if(showOptions) {
            setShowOptions(false)
        }
    };

    const handleClickCategaria = (e) => {
        e.preventDefault();
        setCategoria(e.target.value);
    };

    const handleCoordinates = (data) => {
        //console.log(data)
        setGeocodingData(data);
        
    };

    // Handle input changes and show lists
    const handleInputChange = (e) => {

        e.preventDefault();
        setInputValue(e.target.value);
        setShowList({ ...showList, inputValue: true });
        
    };

    const handleInputDestinoFinal = (e) => {
        e.preventDefault();	
        setDestinoFinal(e.target.value);
        setShowList({ ...showList, destinoFinal: true });
        
        
    };

    const handleClickInicial = async (e) => {
       e.preventDefault()
        if (!inputValue.length && !destinoFinal.length) {
            console.log("Todos los campos son obligatorios");
            setCategoria("")
            setInputValue("")
            setDestinoFinal("")
            setGeocodingData([])
            getPosition(userPosition)
        } 

        if( inputValue ) {
            const [longitude, latitude] = geocodingData;
            console.log('Coordenadas desde Formulario:', { longitude, latitude });
            getPosition({ longitude, latitude });
        } else if(destinoFinal) {

            const [longitude, latitude] = geocodingData;
            console.log('Coordenadas desde Formulario:', { longitude, latitude });
            getPosition({ longitude, latitude });
        }
        
    };
    

    const useUserPositionAsStart = (e) => {
        e.preventDefault();
        if ( userPosition ) {
            //console.log({longitude, latitude})
            getPosition( { longitude:userPosition?.longitude, latitude:userPosition?.latitude }  );
            setInputValue(`${longitude},${latitude}`);
            setShowList(true);
            return
        } else {
            console.error("No hay datos de ubicación de usuario disponibles.");
        }
    };

    useEffect(() => {
        
        const resetInput = setTimeout(() => {

            setInputValue('');
            setDestinoFinal("");
            setCategoria(''); // Reset categoria también
            
            document.getElementById("destino-inicial").value = " ";
            document.getElementById("destino-final").value = " ";
            document.getElementById("categorias").selectedIndex = 0;
            setGeocodingData([]);
        }, 20000);

        return () => clearTimeout(resetInput);

    },[inputValue, destinoFinal, categoria])

  return (
    <div>
        <form >
            <div className='p-3 text-sm lg:text-lg grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                <div className='flex items-center '>
                    <input  type="text"
                    placeholder='Destino Inicial'
                    id='destino-inicial'
                    className="p-2 border-2 rounded-md w-full"
                    value={inputValue}
                    onChange={handleInputChange}
                    />
                    <span className='-mx-12 md:text-3xl text-2xl'>{<FaMapMarkerAlt />} </span>
                </div>
                {showList.inputValue && (
                <GetGeocodingMapBox
                    query={inputValue}
                    onSelectPlace={(place) => {
                    setInputValue(place); // Update input with selected place
                    setShowList({ ...showList, inputValue: false });
                    }}
                    showList={showList.inputValue}
                    getCoordinates={handleCoordinates}
                    
                />
                )}
                
                <div className='flex items-center '>
                    <input  type="text"
                    id='destino-final'
                    placeholder='Destino Final' 
                    className="p-2 border-2 rounded-md w-full "
                    value={destinoFinal}
                    onChange={handleInputDestinoFinal}
                    />
                    <span className='-mx-12 md:text-3xl text-2xl'>{<FaMapMarkerAlt />} </span>
                </div>
                
                {showList.destinoFinal && (
                <GetGeocodingMapBox
                    query={destinoFinal}
                    onSelectPlace={(place) => {
                    setDestinoFinal(place); // Update input with selected place
                    setShowList({ ...showList, inputValue: false })}}
                    showList={showList.destinoFinal}
                    //selectPlace={handlePlace}
                    getCoordinates={handleCoordinates}
                />
                )}

                <div className="flex items-center ">
                    <div className="relative flex w-full items-center">
                        <input
                            type="text"
                            placeholder='Tipo de Servicio'
                            id='categorias'
                            className="p-2 border-2 rounded-md w-full cursor-pointer pl-4"
                            onClick={toggleOptions}
                            readOnly
                            value={categoria}
                            onChange={handleClickCategaria}
                        />
                        <span className='-mx-12 text-2xl md:text-3xl '><FaBus /></span>
                        {showOptions && (
                        <select
                            multiple={true}
                            className="absolute top-10 left-0 z-10 p-2 border-2 rounded-md w-full bg-white"
                            value={selectedOptions}
                            onChange={handleOptionChange}
                            onBlur={() => setShowOptions(false)}
                            onClick={handleClickCategaria}
                        >
                        {Categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.nombreCategoria}>{categoria.nombreCategoria}</option>
                        ))}
                        </select>
                        )}
                    </div>
                </div>
                <div className='bg-white flex items-center text-center rounded-md'>
                    <div className='p-2 border-2 w-full'>
                        <p className='text-sm md:text-lg text-gray-400 font-semibold'>{horas} hora    {minutos} minutos  {calculateDistance} kms </p>
                    </div>
                </div>
            </div>
 
            {/* /*  is a component that is used to fetch geocoding data from the
            MapBox API based on the `inputValue` provided. */ }

            <AddressCurrentPosition 
                longitude={ userPosition.longitude } 
                latitude={ userPosition.latitude } 
                getAddress={(data) => setGeocodingData(data)} 
            />

            <div className='absolute mt-3 '>
                <div className='flex justify-between items-center flex-col gap-1'>
                    <button 
                        onClick={handleClickInicial} 
                        type="submit" className="py-3 px-7 border-2 border-white rounded-md poi bg-verde-menta  text-gray-200 relative" ><span className='text-xl'>{<FaPlusCircle  />}</span> 
                    </button>

                    <button 
                        onClick={useUserPositionAsStart} 
                        type="submit" className="py-3 px-7 border-2 border-white rounded-md poi bg-red-500  text-gray-200 relative" > 
                        <span className='text-xl' >{<FaLocationArrow  />}
                        </span> 
                    </button>
                </div> 
            </div>
            
        </form>

    </div>
  )
}

FormularioPageInicio.propTypes = {
  getPosition: PropTypes.func.isRequired,
  userPosition: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  })
};