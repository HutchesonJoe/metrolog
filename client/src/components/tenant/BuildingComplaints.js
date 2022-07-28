
import ComplaintCard from "../Cards/ComplaintCard"

function BuildingComplaints({complaints, setComplaints}){
  
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