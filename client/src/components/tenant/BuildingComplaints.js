import { useContext, useEffect , useState} from "react";
import { UserContext } from "../UserContext"
import ComplaintCard from "../Cards/ComplaintCard"
import { TenantComplaintContext } from "../TenantComplaintsContext"

function BuildingComplaints({complaints, setComplaints}){
  
  const [user] = useContext(UserContext)
  // const [ complaints, setComplaints ]= useContext(TenantComplaintContext)
  

  // useEffect(()=>{
  //   if(user && user.building){
  //     setComplaints(user.building.tenant_complaints)
  //   }
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