// import moment from "momentjs"
import { useContext } from "react";
import { ComplaintTypesContext } from "../ComplaintTypesInfo";
import { BuildingsContext } from "../BuildingsInfo";

function ComplaintCard({tenantComplaint}){
  const complaintTypes = useContext(ComplaintTypesContext)
  const buildings = useContext(BuildingsContext)
  const building = buildings.find(building=>building.id===tenantComplaint.building_id)
  const complaint = complaintTypes.find(c=>c.id===tenantComplaint.complaint_id)
  const date = tenantComplaint.created_at


  let complaintStatus
  if(tenantComplaint.resolved){
    complaintStatus = "Open"
  } else{
    complaintStatus = "Closed"
  }
  
  if(tenantComplaint!==undefined){
    return(
      <div id="complaint-card">
        {complaint ? <h3>{complaint.complaint_type}</h3> : ""}
        {building ? <h4>{building.address}</h4>: "" }
        <div>Unit #: {tenantComplaint.unit}</div>
        <div>{tenantComplaint.tenant_notes}</div>
        <div>{tenantComplaint.created_at}</div>
        <div>{tenantComplaint.updated_at}</div>
        <div>{complaintStatus}</div>
        <div>How old is this complaint?</div>
      </div>
    )
  } 
}

export default ComplaintCard