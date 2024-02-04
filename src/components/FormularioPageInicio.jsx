/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt, FaBus  } from 'react-icons/fa';
import GetGeocodingMapBox from '../api/GetGeocodingMapBox';
import AddressCurrentPosition from '../api/AddressCurrentPosition';
import Categorias  from '../api/Categorias';

export const FormularioPageInicio = ( { getPosition, userPosition } ) => {

    const [inputValue, setInputValue] = useState('');
    const [geocodingData, setGeocodingData] = useState([]);
    const [ categoria, setCategoria ] = useState('')
    const [address, setAddress] = useState('');
    const [showList, setShowList] = useState(true);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (e) => {
        e.preventDefault();
        const options = Array.from(e.target.selectedOptions, option => option.value)
        console.log(options)
        setSelectedOptions(options);
    }
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleClickCategaria = (e) => {
        e.preventDefault();
        setCategoria(e.target.value)
        console.log(e.target.value)
    }

    useEffect(() => {
        if ( inputValue ) {
            setShowList(true);
            setAddress(address)
        } else {
            setShowList(false);
        }
    }, [inputValue, address]);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setInputValue(inputValue);
        
        
    };

    const handleInputDestinoFinal = (e) => {
        const inputValue = e.target.value;
        setInputValue(inputValue);
    }

    const handleListItemClick = (place) => {
        setInputValue(place);
        setShowList(false);
    };

    /**
     * The handleSearch function sets the position of a marker based on geocoding data.
     */
    const handleSearch = (e) => {
        e.preventDefault();
        if (!geocodingData) {
            console.log("No hay datos de geocodificación disponibles.");
            return;
        }
        /* `getPosition({ newPosition: geocodingData });` is calling the `getPosition` function and
        passing an object as an argument. The object has a key `newPosition` and its value is
        `geocodingData`. This is typically used to update the position of a marker on a map based on
        the geocoding data received from the API. */
        getPosition({ newPosition: geocodingData });
    };

    const useUserPositionAsStart = (e) => {
        e.preventDefault();
        if (userPosition && userPosition.latitude && userPosition.longitude) {
            getPosition({ newPosition: userPosition });
            const { latitude, longitude } = userPosition
            setInputValue(`${longitude},${latitude}`);
        } else {
            console.error("No hay datos de ubicación de usuario disponibles.");
        }
    };
  return (
    <div>
        <form >
            <div className='p-3 text-sm lg:text-lg grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                <div className='flex items-center '>
                    <input  type="text"
                    placeholder='Destino Inicial' 
                    className="p-2 border-2 rounded-md w-full "
                    value={inputValue}
                    onChange={handleInputChange}
                    />
                    <span className='-mx-8 md:text-3xl text-2xl'>{<FaMapMarkerAlt />} </span>
                </div>
                {showList && (
                <div className='absolute w-[24rem] '>
                    <ul className='relative text-white -left-3 -bottom-12 bg-gray-400 rounded-md'>
                    {geocodingData.map((place) => (
                    <li key={place.id} className='p-2 py-3 border-2 rounded-md'
                        onClick={() => handleListItemClick(place.place_name, place)}
                        >
                        <div className='flex justify-between w-full rounded-lg'>
                            <div className='flex items-center  w-full '>
                                <FaMapMarkerAlt className='mr-2 w-10' />
                                <p className='text-sm flex flex-1'>{place.place_name}</p>
                            </div>
                        </div>
                    </li>
                    ))}
                    </ul>
                </div>
                )}
                <div className='flex items-center '>
                    <input  type="text"
                    placeholder='Destino Final' 
                    className="p-2 border-2 rounded-md w-full "
                    value={inputValue}
                    onChange={handleInputDestinoFinal}
                    />
                    <span className='-mx-8 md:text-3xl text-2xl'>{<FaMapMarkerAlt />} </span>
                </div>
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
            <GetGeocodingMapBox query={inputValue} 
            onGeocodingData={(data) => setGeocodingData(data)} />

            <AddressCurrentPosition longitude={userPosition?.latitude} 
            latitude={userPosition?.longitude} 
            getAddress={(data) => setAddress(data.features[0].place_name)} />
            

            <div className=' absolute w-48 mt-3 -right-9 '>
                <div className='flex justify-between items-center flex-col gap-1'>
                    <button onClick={handleSearch} type="submit" placeholder='Bucar' className="py-3 px-2 border-2 rounded-md poi bg-red-500 w-28 text-gray-200 relative" >Agregar</button>
                    <span className='-mx-8 text-xl'></span>
                    <button onClick={useUserPositionAsStart}  type="submit" placeholder='Bucar' className="py-3 px-2 border-2 rounded-md poi bg-azul-oscuro text-gray-200 font-semibold w-44 relative" >Usar tu ubicacion </button>
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