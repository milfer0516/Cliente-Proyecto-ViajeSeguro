import { useState } from 'react'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css"

const accessToken = (mapboxgl.accessToken = 
    "pk.eyJ1IjoibWlsZmVyMTYiLCJhIjoiY2xyd3Fub2F3MHI2bDJrcGdhYjMxb2liYiJ9.DAWRcin7uu6LHRY8KKmzQA");

// eslint-disable-next-line react/prop-types
const MapaMapBox = ({ searchedLocation }) => {

   const [viewport, setViewport] = useState({
        width: '100%',
        height: '400px',
        latitude: 4.60971,
        longitude: -74.08175,
        zoom: 13
    });

    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={accessToken}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onViewportChange={(newViewport) => setViewport(newViewport)}
        >
            {/* Marcador en una ubicación específica */}
            <Marker latitude={4.60971} longitude={-74.08175} offsetLeft={-20} offsetTop={-10}>
                <div>Ubicación</div>
            </Marker>

             {/* Control de navegación para zoom */}
            <div style={{ position: 'absolute', right: 30, top: 30 }}>
                <NavigationControl />
            </div>
        </ReactMapGL>
    );
}

export default MapaMapBox