import { useState, useEffect, useContext } from "react";
import { BuildingsContext } from "../BuildingsInfo"
import ComplaintCard from "../Cards/ComplaintCard"
import { UserContext } from "../UserContext"

function SuperComplaintsByBuilding(){
  const[building, setBuilding] = useState()
  const [user] = useContext(UserContext)

  let superBuildings
  
  useEffect(()=>{
    if(user){
      superBuildings = user.buildings
    }
  },[user])

  let buildingOptions
  if(superBuildings){
    buildingOptions = superBuildings.map((building)=><option key={building.id} value={building.id}>{building.address}</option>)

  }
 
  function handleSelect(e){
    const selectedBuilding = superBuildings.find((building)=>building.id===parseInt(e.target.value))
    setBuilding(selectedBuilding);
  }

  let complaintList = ""

  if(building && building.tenant_complaints.length!==0){
    complaintList = building.tenant_complaints.map((complaint)=><ComplaintCard key = {complaint.id}tenantComplaint={complaint}/>)
  } else if (building && building.tenant_complaints.length===0){
    complaintList = "No complaints in this building."
  } 
  
  return(
    <div>
      <select onChange={handleSelect}>
        <option>Select Building</option>
        {buildingOptions}
      </select>
      <div>
        {complaintList}
      </div>
    </div>
  )
}


export default SuperComplaintsByBuilding;