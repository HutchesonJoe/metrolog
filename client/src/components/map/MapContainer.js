
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useContext, useEffect } from "react";
import { BuildingsContext } from '../BuildingsInfo';

const MapContainer = () => {
  const buildings = useContext(BuildingsContext)
  
  console.log(buildings)

  
  const[ selected, setSelected ] = useState({})
  const[ locations, setLocations ] = useState([])
  
  useEffect(()=>{
    if(buildings){
      let buildingStats = []
      buildings.map((building)=>{
        const location = {
          lng: building.longitude,
          lat: building.latitude
        }
        const name = building.address
        const unitCount = building.number_of_units
        const complaintCount = building.tenant_complaints.length
        buildingStats.push({name, location, unitCount, complaintCount})
      })
      setLocations(buildingStats)
    }
  },[buildings])
 
  function onSelect(item){
    setSelected(item)
  }

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
              console.log(building)
              return(
                <Marker key={building.id} position={building.location} onClick={()=>onSelect(building)}/>
              )
            })
            }{
              selected.location &&
              (
                <InfoWindow
                key={selected.id}
                position={selected.location}
                clickable={true}
                onCloseClick={() => setSelected({})}
                >
                  <div>
                    <ul>
                    <h3>{selected.name}</h3>
                    <li>{selected.unitCount} units in buildling</li>
                    <li>{selected.complaintCount} complaints filed</li>
                    </ul>
                   
                  </div>
               
                </InfoWindow>
              )
            }
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;