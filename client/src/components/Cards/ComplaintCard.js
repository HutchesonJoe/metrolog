// import moment from "momentjs"
import { useContext, useState, useEffect } from "react";
import { ComplaintTypesContext } from "../ComplaintTypesInfo";
import { BuildingsContext } from "../BuildingsInfo";
import { UserContext } from "../UserContext"
import EditComplaint from "../tenant/EditComplaint";
import SuperAddNote from "../super/SuperAddNote"


function ComplaintCard({tenantComplaint}){
  const[buttonChoice, setButtonChoice] = useState("")
  const[complaint, setComplaint] = useState({tenantComplaint})
  
  useEffect(()=>{
    setComplaint(tenantComplaint)
  },[])

  const complaintTypes = useContext(ComplaintTypesContext)
  const buildings = useContext(BuildingsContext)
  const user = useContext(UserContext)
  
  let building
  
  if(buildings){
    building = buildings.find(building=>building.id===tenantComplaint.building_id)
  }
  const complaintType = complaintTypes.find(c=>c.id===tenantComplaint.complaint_id)
  const date = tenantComplaint.created_at


  let complaintStatus
  if(!tenantComplaint.resolved){
    complaintStatus = "Open"
  } else{
    complaintStatus = "Closed"
  }

  let editWindow = ""

  
    if(buttonChoice==="Edit"){
      editWindow = <EditComplaint complaintId={tenantComplaint.id} setComplaint={setComplaint}/>
    } else if (buttonChoice==="Add Note" && user.apartment){
      editWindow = <EditComplaint complaintId={tenantComplaint.id}/>
    } else if (buttonChoice==="Add Note" && user.buildings){
      editWindow = <SuperAddNote complaintId={tenantComplaint.id} setComplaint={setComplaint}/>
    }
 
  
  if(tenantComplaint!==undefined){
    return(
      <div id="complaint-card">
        {complaint ? <h3>{complaintType.complaint_type}</h3> : ""}
        {building ? <h4>{building.address}</h4>: "" }
        <div>Unit #: {tenantComplaint.unit}</div>
        <div>Tenant notes: {tenantComplaint.tenant_notes}</div>
        <div>Super notes: {complaint.super_notes}</div>
        <div>{tenantComplaint.created_at}</div>
        <div>{tenantComplaint.updated_at}</div>
        <div>{complaintStatus}</div>
        <div>How old is this complaint?</div>
        <div>
          <button onClick={()=>setButtonChoice("Edit")}>Edit Complaint</button>
          <button onClick={()=>setButtonChoice("Add Note")}>Add Notes</button>
          <button onClick={()=>setButtonChoice("Delete")}>Delete Complaint</button>
        </div>
        <div id="edit-window">
          {editWindow}
        </div>
      </div>
    )
  } 
}

export default ComplaintCard