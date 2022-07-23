import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext"
import ComplaintCard from "../Cards/ComplaintCard"
import { TenantComplaintContext} from "../TenantComplaintsContext"

function BuildingComplaints(){
  
  const [user] = useContext(UserContext)
  const [complaints, setComplaints ]= useContext(TenantComplaintContext)
  console.log(complaints)
  // const [buildingComplaints, setBuildingComplaints] = useState([])
  
  // useEffect(()=>{
  //   console.log(user)
  //   if(user && user.building){
  //     setComplaints(user.building.tenant_complaints)
  //   }
      
  // },[user])

  // useEffect(()=>{
  //   setBuildingComplaints(complaints)
  // },[complaints])


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