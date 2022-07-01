import { useState, useEffect} from "react";
import ComplaintCard from "../Cards/ComplaintCard";

function ComplaintsByBuilding(){
  const[buildings, setBuildings] = useState([])
  const[tenantComplaints, setTenantComplaints] = useState([])

  useEffect(()=>{
    fetch("./buildings")
    .then(r=>r.json())
    .then(data=>setBuildings(data))
  },[])

  let complaintList
  
  function handleBuildingSelect(e){
    const building = buildings.find(b=>b.id === parseInt(e.target.value))
    setTenantComplaints(building.tenant_complaints)
    // complaintList = tenantComplaints.map((tenantComplaint)=><ComplaintCard tenantComplaint={tenantComplaint}/>)
  }

  const buildingList = buildings.map((building)=><option key={building.id} value={building.id}>{building.address}</option>)

  return(
    <div>
       <div>
        <select onChange={handleBuildingSelect}>
          {buildingList}
        </select>
      </div>
      <div id="building-complaints-window">
      {tenantComplaints.map((tenantComplaint)=><ComplaintCard tenantComplaint={tenantComplaint} key={tenantComplaint.id}/>)}
      </div>
    </div>
   
  )
  
}

export default ComplaintsByBuilding