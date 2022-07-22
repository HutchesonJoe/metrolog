import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext"
import ComplaintCard from "../Cards/ComplaintCard"

function BuildingComplaints({complaints, setComplaints}){
  
  const user = useContext(UserContext)
  
  useEffect(()=>{
    console.log(user)
    if(user.building){
      setComplaints(user.building.tenant_complaints)
    }
      
  },[user])


  let tenantBuildingComplaints 

  if(complaints){
    tenantBuildingComplaints = complaints.map((complaint)=><ComplaintCard key={complaint.id} tenantComplaint={complaint} complaints={complaints} setComplaints={setComplaints}/>)
  }

  return(
    <div>
      {tenantBuildingComplaints}
    </div>
  )
}

export default BuildingComplaints;