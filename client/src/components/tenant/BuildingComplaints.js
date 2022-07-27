import { useContext, useEffect } from "react";
// import { UserContext } from "../UserContext"
import ComplaintCard from "../Cards/ComplaintCard"
import { TenantComplaintContext } from "../TenantComplaintsContext"

function BuildingComplaints(){
  
  // const [user] = useContext(UserContext)
  const [ complaints, setComplaints ]= useContext(TenantComplaintContext)

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