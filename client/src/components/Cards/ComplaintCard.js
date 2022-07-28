import { useContext, useState, useEffect } from "react";
import { BuildingsContext } from "../BuildingsInfo";
import { UserContext } from "../UserContext"
import EditComplaint from "../EditComplaint";
import Errors from "../Errors"


function ComplaintCard({tenantComplaint, complaints, setComplaints}){
  
  const createdAt = new Date(tenantComplaint.created_at)
  const updatedAt = new Date(tenantComplaint.updated_at)
  const now = new Date()
  const timeLapsed = Math.floor(Math.abs(now - createdAt)/(1000 * 60 * 60 * 24))
  
  const[editWindowOn, setEditWindowOn] = useState(false)
  const[complaint, setComplaint] = useState(tenantComplaint)
  const[errors, setErrors] = useState([])
  const[isSuper, setIsSuper] = useState(false)
  const[compStatus, setCompStatus] = useState()
  
  const buildings = useContext(BuildingsContext)
  const [user] = useContext(UserContext)

  
  useEffect(()=>{
    setComplaint(tenantComplaint);
    if(user && user.buildings){
      setIsSuper(true)
    }
  },[user])

  useEffect(()=>{
    setCompStatus(tenantComplaint.resolved)
  },[])
  
  let building
  
  if(buildings){
    building = buildings.find(building=>building.id===tenantComplaint.building_id)
  }

  function handleClick(){
    setErrors([])
    if(!user){
      setErrors(["You must be logged in to edit/update/delete complaints."]);
    } else {
      setEditWindowOn(!editWindowOn)
    }
  }
    

  function handleDelete(){
    if(!user){
      setErrors(["You must be logged in to edit/update/delete complaints."]);
    } else{
      if(isSuper){
        setErrors(["Only a tenant can delete a complaint."])
      } else {
        const deleteConfirm = window.confirm("Are you sure you want to delete this complaint? You CANNOT undo this action. 'OK' to confirm, or CANCEL.")
        if(deleteConfirm){
          fetch(`/tenant_complaints/${tenantComplaint.id}`,{
          method: "DELETE"
          })
          .then((r)=>{
            if(r.ok){
             
              const filteredComplaints = complaints.filter((comp)=>comp.id!==(parseInt(complaint.id)));
              setComplaints(filteredComplaints)
            } else {
                r.json().then((err)=> setErrors(err.errors))
              }
              
          })
        }
      }
    }
  }  
 

  if(tenantComplaint!==undefined){
    return(
      <div id="complaint-card">
        <h3>{complaint.complaint_type}</h3>
        {building ? <h4>{building.address}</h4>: "" }
        <div>Unit #: {complaint.unit}</div>
        <div>Tenant notes: {complaint.tenant_notes}</div>
        <div>Super notes: {complaint.super_notes}</div>
        <div>Opened: {createdAt.toString()}</div>
        <div>Updated: {updatedAt.toString()}</div>
        <div id={compStatus ? "" : "open"}>{compStatus ? "Closed" : "Open"}</div>
        {compStatus ? "" : <div>This complaint has been open for {timeLapsed} days.</div>}
        <div>
          <button onClick={handleClick}>{editWindowOn ? "Close" : "Edit Complaint/Add Note"}</button>
          <button onClick={handleDelete}>Delete Complaint</button>
        </div>
        <div id="edit-window">
          {editWindowOn ? <EditComplaint complaintId={tenantComplaint.id} complaint={complaint} setComplaint={setComplaint} setComplaints={setComplaints} isSuper={isSuper} setIsSuper={setIsSuper}/> : ""}
        </div>
        <div>
          <Errors errors={errors}/>
        </div>
      </div>
    )
  } 
}

export default ComplaintCard