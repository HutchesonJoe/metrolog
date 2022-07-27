import { useState, useEffect, useContext} from "react";
import ComplaintCard from "./Cards/ComplaintCard";
import { BuildingsContext } from "./BuildingsInfo";
// import { Wrapper, Status } from "@googlemaps/react-wrapper"
import MapContainer from "./map/MapContainer"

function ComplaintsByBuilding(){

  const buildings = useContext(BuildingsContext)
  
  const[tenantComplaints, setTenantComplaints] = useState([])
  const[complaintTypes, setComplaintTypes] = useState([])
  const[noComplaints, setNoComplaints] = useState(false)

  useEffect(()=>{
    fetch("./complaints")
      .then(r=>r.json())
      .then(data=>setComplaintTypes(data))
  },[])

  function handleBuildingSelect(e){
   
    if(parseInt(e.target.value)===0){
      setNoComplaints(false)
    } else {
        const building = buildings.find(b=>b.id === parseInt(e.target.value))
        setTenantComplaints(building.tenant_complaints)
        if(building.tenant_complaints.length===0){
          setNoComplaints(true)
        } else {
          setNoComplaints(false)
        }
    }
  }

  const buildingList = buildings.map((building)=><option key={building.id} value={building.id}>{building.address}</option>)

  return(
    <div>
       <div>
        <select onChange={handleBuildingSelect}>
          <option value={0}>Select Building to View All Complaints</option>
          {buildingList}
        </select>
      </div>
      
      <div id="building-complaints-window">
      {tenantComplaints.map((tenantComplaint)=><ComplaintCard tenantComplaint={tenantComplaint} complaintTypes={complaintTypes} key={tenantComplaint.id}/>)}
      </div>
      <div>
        {noComplaints ? "No complaints in this Building." : ""}
      </div>
      <div>
    
        <MapContainer/>
        
      </div>
    </div>
   
  )
  
}

export default ComplaintsByBuilding