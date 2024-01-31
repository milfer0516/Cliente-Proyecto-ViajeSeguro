/* eslint-disable react/prop-types */
import { useMapEvents, Marker, Popup } from 'react-leaflet'
import { useState } from 'react'

export const CurrentPosition = () => {


   const [position, setPosition] = useState(null)
        const map = useMapEvents({
            click() {
            map.locate()
            },
        locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
        },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Te encuentras aquí</Popup>
      
    </Marker>
  )
}