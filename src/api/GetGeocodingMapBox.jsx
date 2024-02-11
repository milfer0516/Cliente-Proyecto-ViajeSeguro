/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt  } from 'react-icons/fa'
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN_MAPBOX;

const GetGeocodingMapBox = ({ query, onSelectPlace, showList, getCoordinates }) => {

    const [ geocodingData, setGeocodingData ] = useState([]);

    useEffect(() => {
        if(query) {
            const fetchDataFromMapBox = async () => {
                try {
                    
                    const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&country=CO`);

                    //console.log(data.features[0].geometry.coordinates);
                    setGeocodingData(data.features);
                    return data.features[0]
                
                } catch (error) {
                    console.log("Error obteniendo datos de geocodificación: ", error);
                    return [];
                }
                
            };
            fetchDataFromMapBox()
            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ query ]);
    

    const handleSelectPlace = async (place = []) => {
        
        if(!onSelectPlace(place)) {
            setGeocodingData([])
        } else {
            onSelectPlace(place);
        }

        if(geocodingData) {

            console.log(geocodingData[0])
            await getCoordinates(geocodingData[0].geometry.coordinates);

        } else if(!geocodingData) {
            setGeocodingData([])
        }
    };

     useEffect(() => {

     },[onSelectPlace, query, showList, getCoordinates]);

    return (
       <div className='absolute w-[24rem] '>
            {showList ? (
            <ul className='relative text-white -left-3 -bottom-20 bg-gray-400 rounded-md z-10'>
                {geocodingData.map((place) => (
                    <li key={place.id} className='p-2 py-3 border-2 rounded-md'
                    onClick={() => handleSelectPlace(place.place_name)}>
                    <div className='flex justify-between w-full rounded-lg'>
                        <div className='flex items-center  w-full '>
                            <FaMapMarkerAlt className='mr-2 w-10' />
                            <p className='text-sm flex flex-1' >{place.place_name}</p>
                            
                        </div>
                        
                    </div>
                </li>
                ))}
            </ul>
            ): null}
        </div>
    );
};

export default GetGeocodingMapBox;
