import axios from "axios"
import { useEffect } from "react"
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN_MAPBOX;

// eslint-disable-next-line react/prop-types
const AddressCurrentPosition = ( { latitude, longitude, getAddress } ) => {
    
    //console.log("Coordenadas utilizadas:", latitude, longitude);

    useEffect(() => {

        const fetchAddressMapBox = async () => {
            try {
                const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`);

                //console.log(response);
                getAddress(response.data);
                //return response.data;
                
            } catch (error) {
               console.error("Error obteniendo la dirección del usuario", error); 
            }
        }

        if(longitude && latitude && [longitude, latitude]  > 2) {
            fetchAddressMapBox();
        }
        

    },[latitude, longitude, getAddress])


  return null
}

export default AddressCurrentPosition;