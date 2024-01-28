import { useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaSearch, FaBus  } from 'react-icons/fa';
import { MdCalendarMonth } from 'react-icons/md'

const TOKEN_ACCESS = "pk.eyJ1IjoibWlsZmVyMTYiLCJhIjoiY2xyd3Fub2F3MHI2bDJrcGdhYjMxb2liYiJ9.DAWRcin7uu6LHRY8KKmzQA"

// eslint-disable-next-line react/prop-types
export const FormularioPageInicio = ({ onSearchLocation }) => {

    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (event) => {
        const query = event.target.value
        setSearch(query);

        if( query > 2 ) {
            obtenerSugerenciasAutocompletado(query)
        }
    };

    const obtenerSugerenciasAutocompletado = async (query) => {
        try {
            const response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${TOKEN_ACCESS}`
            );
            const features = response.data.features;
            setSuggestions(features);
        } catch (error) {
            console.error('Error al obtener sugerencias de autocompletado:', error);
        }
    };
    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion.place_name);
        setSuggestions([]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${TOKEN_ACCESS}`)

            console.log(response)

            const coordinates = response.data.features[0].center;
            onSearchLocation(coordinates);
        } catch (error) {
            console.log("Error al buscar la ubicación", error)
        }
    }

  return (

     <form onSubmit={handleFormSubmit}>
         <ul>
            {suggestions.map((suggestion) => (
                <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion.place_name}
                </li>
            ))}
        </ul>
        <div className='p-3 text-sm lg:text-lg grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
            <div className='flex items-center '>
            <input  type="text"
            value={search}
            placeholder='Destino' 
            className="p-2 border-2 rounded-md w-full " 
            onChange={handleInputChange}
            />
            <span className='-mx-8 md:text-3xl text-2xl'> <button type="submit">{<FaMapMarkerAlt />}</button> </span>
            </div>
            <div className="flex items-center">
            <input type="text" placeholder='Fecha' className="p-2 md:py-3 border-2 rounded-md w-full text-sm" />
            <span className='-mx-8 md:text-3xl text-2xl'> {<MdCalendarMonth />} </span>
            </div>
            <div className="flex items-center">
            <input type="text" placeholder=' Tipo de Servicio ' className="p-2 border-2 rounded-md w-full" />
            <span className='-mx-8 text-2xl md:text-3xl'> {<FaBus  />} </span>

            </div>
            <div className='flex items-center lg:mx-28'>
            <input type="search" placeholder='Buscar' className="p-2 border-2 rounded-md lg:w-32 w-full " />
            <span className='-mx-8 text-xl'> {<FaSearch />} </span>
            </div>
        </div>
    </form>
  )
}
