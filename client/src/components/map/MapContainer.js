
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useContext, useEffect } from "react";
import { BuildingsContext } from '../BuildingsInfo';

//import buildings info
//set each building as an object as below
//the buildings info is static, but the number of complaints is updated
//latitude and longitude becomes part of the building info


const MapContainer = () => {
  const buildings = useContext(BuildingsContext)
  
  console.log(buildings)
  
  const[ selected, setSelected ] = useState({})

  function onSelect(item){
    setSelected(item)
  }
  const locations =[
    {name: "Riverside",
    location: {
      lat: 40.782023609130285, 
      lng: -73.98497252935798
    }

    },
  ]
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 40.7812, lng: -73.9665
  }
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyCm4gB5LX1PXFyaXst7ryFqQjgBJk_a1HU'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}>
            {
            locations.map(building=>{
              return(
                <Marker key={building.name} position={building.location} onClick={()=>onSelect(building)}/>
              )
            })
            }{
              selected.location &&
              (
                <InfoWindow
                position={selected.location}
                clickable={true}
                onCloseClick={() => setSelected({})}
                >
                  <p>{selected.name}</p>
                </InfoWindow>
              )
            }
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;