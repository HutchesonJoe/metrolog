import { useState, useEffect, useContext} from "react";
import ComplaintCard from "./Cards/ComplaintCard";
import { BuildingsContext } from "./BuildingsInfo";

function ComplaintsByBuilding(){

  const buildings = useContext(BuildingsContext)
  
  const[tenantComplaints, setTenantComplaints] = useState([])
  const[complaintTypes, setComplaintTypes] = useState([])
  

  useEffect(()=>{
    fetch("./complaints")
      .then(r=>r.json())
      .then(data=>setComplaintTypes(data))
  },[])

  function handleBuildingSelect(e){
    
    const building = buildings.find(b=>b.id === parseInt(e.target.value))
    if(building){
      setTenantComplaints(building.tenant_complaints)
    } else {setTenantComplaints([])}

  }

  const buildingList = buildings.map((building)=><option key={building.id} value={building.id}>{building.address}</option>)

  return(
    <div>
       <div>
        <select onChange={handleBuildingSelect}>
          <option>Select Building to View All Complaints</option>
          {buildingList}
        </select>
      </div>
      <div id="building-complaints-window">
      {tenantComplaints.map((tenantComplaint)=><ComplaintCard tenantComplaint={tenantComplaint} complaintTypes={complaintTypes} key={tenantComplaint.id}/>)}
      </div>
    </div>
   
  )
  
}

export default ComplaintsByBuilding