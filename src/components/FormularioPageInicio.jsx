import { useState } from 'react';
import { FaMapMarkerAlt, FaSearch, FaBus  } from 'react-icons/fa';
import { MdCalendarMonth } from 'react-icons/md'
import GetGeocodingMapBox from '../api/GetGeocodingMapBox';


export const FormularioPageInicio = () => {

    const [inputValue, setInputValue] = useState('');
    const [geocodingData, setGeocodingData] = useState([]);
    const [showList, setShowList] = useState(true);
    //const [ selectPosition, setSelectPosition ] = useState(null)

    const handleInputChange = async (e) => {
        e.preventDefault();
        const inputValue = e.target.value; // Obténer el valor actual del campo de entrada
        console.log(inputValue)
        setInputValue(inputValue); // Actualiza el estado inputValue

        // Verifica la longitud del valor actualizado del campo de entrada
        if (inputValue.length > 2) {
            setShowList(true);
            setGeocodingData([]);
        } else {
            setShowList(false);
    }
};

    const handleListItemClick = (place) => {
        console.log(place)
        setInputValue(place)
        setShowList(false);
    };

    const handleClick = (e) => {
        e.preventDefault();
        //console.log(geocodingData);
        if(geocodingData.length > 0) {
            setInputValue(geocodingData[0].place_name);
        }
        else {
            setTimeout(() => {
                setInputValue('');
                setGeocodingData([])
            }, 2000);
        }
        console.log(inputValue);
        
    };
    
  return (

     <form >
        <div className='p-3 text-sm lg:text-lg grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
            <div className='flex items-center '>
                <input  type="text"
                placeholder='Destino' 
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
                    onClick={() => handleListItemClick(place.place_name)}
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
            <div className="flex items-center">
                <input type="text" placeholder='Fecha' className="p-2 md:py-3 border-2 rounded-md w-full text-sm" />
                <span className='-mx-8 md:text-3xl text-2xl'> {<MdCalendarMonth />} </span>
            </div>
            <div className="flex items-center">
                <input type="text" placeholder=' Tipo de Servicio ' className="p-2 border-2 rounded-md w-full" />
                <span className='-mx-8 text-2xl md:text-3xl'> {<FaBus  />} </span>

            </div>
            <div className='flex items-center lg:mx-28'>
                <button onClick={handleClick} type="submit" placeholder='Bucar' className="p-2 border-2 rounded-md lg:w-32 w-full poi bg-red-500" >Buscar </button>
                <span className='-mx-8 text-xl'>{<FaSearch />}</span>
            </div>
        </div>
        <GetGeocodingMapBox query={inputValue} 
        onGeocodingData={(data) => setGeocodingData(data)}
        
        />
        
    </form>
    
  )
}
