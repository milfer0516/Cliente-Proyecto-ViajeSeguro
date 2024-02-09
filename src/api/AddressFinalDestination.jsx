/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN_MAPBOX;

const AddressFinalDestination = ({ query, getAddressFinal }) => {

    useEffect(() => {
        const fetchDataFromMapBox = async () => {
            try {
                const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`);

                //console.log(data.features[0].geometry.coordinates);
                //console.log(data.features[0].place_name)
                getAddressFinal(data.features);
                return data.features;
                
            } catch (error) {
                console.log(error);
                return [];
            }
            
        };

        if (query && query.length > 2 ) {
            fetchDataFromMapBox();
        }
    }, [query, getAddressFinal ]);
  return null;
}

export default AddressFinalDestination;