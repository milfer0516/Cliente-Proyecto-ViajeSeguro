/* eslint-disable react/prop-types */
import { useMapEvents, Marker, Popup } from 'react-leaflet'
import { useState, useEffect } from 'react'

// eslint-disable-next-line no-unused-vars
export const CurrentPosition = ( { selectPosition } ) => {
    const [markerPosition, setMarkerPosition] = useState(null); // Estado para la posición del marcador
    //console.log(selectPosition)

    useEffect(() => {
        if (selectPosition) {
            setMarkerPosition(selectPosition);
        }
    }, [selectPosition]);

    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e) {
          
        const currentPosition = e.latlng; // Obtener la posición actual del evento
          setMarkerPosition(currentPosition); // Establecer la posición del marcador
         //updateMapPosition(currentPosition); // Actualizar la posición del mapa
          map.flyTo(currentPosition, map.getZoom()); // Volar al nuevo centro del mapa
      },

    });
     

    return selectPosition  ? (
        <div className=''>
            
            {/* Mostrar el marcador seleccionado */}
            {selectPosition && (
                <Marker position={selectPosition}>
                    <Popup>Ubicación seleccionada</Popup>
                </Marker>
            )}
            
            {/* Mostrar el marcador del usuario si no se ha seleccionado una nueva ubicación */}
            {!selectPosition && markerPosition && (
                <Marker position={markerPosition}>
                    <Popup>Te encuentras aquí</Popup>
                </Marker>
            )}
        
        </div>
    ) : null;
};