/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { FaMapMarkerAlt, FaBus  } from 'react-icons/fa';
import GetGeocodingMapBox from '../api/GetGeocodingMapBox';
import AddressCurrentPosition from '../api/AddressCurrentPosition';
import Categorias  from '../api/Categorias';

export const FormularioPageInicio = ( { getPosition, userPosition } ) => {

    const [inputValue, setInputValue] = useState('');
    const [destinoFinal, setDestinoFinal] = useState('');
    const [categoria, setCategoria] = useState('');
    const [showList, setShowList] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [geocodingResponse, setGeocodingResponse] = useState(null);
    const [storedCoordinates, setStoredCoordinates] = useState(null);
    
    // Constante de las Coordenadas 
    const { longitude, latitude } = userPosition;


    useEffect(() => {
        // Verificar si hay coordenadas almacenadas en las cookies al montar el componente
        Cookies.get('userCoordinates');
        console.log(storedCoordinates)
        if (storedCoordinates) {
            setStoredCoordinates(inputValue);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storedCoordinates, Cookies]);


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
        setGeocodingResponse(data);
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        //e.target.value
        if(e.target.value) {
            setInputValue(e.target.value)
            setShowList(true);
        } else if(!e.target.value) {
            setShowList(false);
            e.target.value = null;
        }
        
    };

    const handleInputDestinoFinal = (e) => {
        e.preventDefault();

        if(e.target.value) {
            setDestinoFinal(e.target.value);
            setShowList(true);
        } else {
            setShowList(false);
            e.target.value = null
        }

    };

    const handleClickInicial = (e) => {
        e.preventDefault();
        
        if (inputValue) {
            getPosition({ longitude: geocodingResponse[0], latitude:geocodingResponse[1]});
            
        } else if(destinoFinal) {
            getPosition({ longitude: geocodingResponse[0], latitude:geocodingResponse[1]});
            
        }
        
    };
    useEffect(() => {
    
        if (inputValue && destinoFinal) {
           setTimeout(() => {
                setInputValue("")
                setDestinoFinal("")
                setShowList(false)
           }, 5000);
            
        }

    }, [inputValue,destinoFinal])
    

    const useUserPositionAsStart = (e) => {
        e.preventDefault();
        if (userPosition) {
            getPosition({longitude, latitude} );
            setInputValue(`${longitude},${latitude}`);
            setShowList(true);
        } else {
            console.error("No hay datos de ubicación de usuario disponibles.");
        }
    };

    const handlePlace = (e) => {
        const place = e.target.textContent;
        if (place) {
            setShowList(false);
        }
    };


  return (
    <div>
        <form >
            <div className='p-3 text-sm lg:text-lg grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                <div className='flex items-center '>
                    <input  type="text"
                    placeholder='Destino Inicial'
                    name='DestinoInicial'
                    className="p-2 border-2 rounded-md w-full"
                    value={inputValue}
                    onChange={handleInputChange}
                    />
                    <span className='-mx-8 md:text-3xl text-2xl'>{<FaMapMarkerAlt />} </span>
                </div>
                
                <GetGeocodingMapBox query={inputValue} onSelectPlace={setInputValue} showList={showList} selectPlace={handlePlace} getCoordinates={handleCoordinates}  />
                
                <div className='flex items-center '>
                    <input  type="text"
                    name='DestinoFinal'
                    placeholder='Destino Final' 
                    className="p-2 border-2 rounded-md w-full "
                    value={destinoFinal}
                    onChange={handleInputDestinoFinal}
                    />
                    <span className='-mx-8 md:text-3xl text-2xl'>{<FaMapMarkerAlt />} </span>
                </div>

                <GetGeocodingMapBox query={destinoFinal} onSelectPlace={setDestinoFinal} showList={showList} selectPlace={handlePlace} getCoordinates={handleCoordinates} />
                
                <div className="flex items-center ">
                    <div className="relative flex w-full items-center">
                        <input
                            type="text"
                            placeholder='Tipo de Servicio'
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
            </div>
 
            {/* /*  is a component that is used to fetch geocoding data from the
            MapBox API based on the `inputValue` provided. */ }

            <AddressCurrentPosition 
                longitude={ longitude } 
                latitude={ latitude } 
                getAddress={(data) => setGeocodingResponse(data)} 
            />

            <div className=' absolute w-48 mt-3 -right-9 '>
                <div className='flex justify-between items-center flex-col gap-1'>
                    <button 
                    onClick={handleClickInicial} 
                    type="submit" className="py-3 mr-7 px-2 border-2 rounded-md poi bg-red-500  text-gray-200 relative" >Click Destino Inicial</button>
                    {/* <button 
                    onClick={handleClickFinal} 
                    type="submit" className="py-3 mr-7 px-2 border-2 rounded-md poi bg-green-400  text-gray-200 relative" >Click Destino Final</button> */}
                    
                    <button onClick={useUserPositionAsStart}  type="submit" placeholder='Bucar' className="py-3 mr-9 px-2 border-2 rounded-md poi bg-azul-oscuro text-gray-200 font-semibold w-44 relative" >Usar tu ubicacion </button>
                    <span className='-mx-8 text-xl'></span>
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