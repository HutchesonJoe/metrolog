import { useState, useContext, useEffect } from "react";
import { ComplaintTypesContext } from "./ComplaintTypesInfo"

function EditComplaint({complaintId, complaint, setComplaint, isSuper, setEditWindowOn}){
const[notes, setNotes] = useState("")
const[type, setType] = useState(complaint.complaint_type)
const[typeId, setTypeId] = useState(complaint.complaint_id)
const complaintTypes = useContext(ComplaintTypesContext)

useEffect(()=>{
  if(isSuper){
    if(complaint.super_notes){
      setNotes(complaint.super_notes)
    }
  } else {
    setNotes(complaint.tenant_notes)
  }
},[])

let updatedNote

if(isSuper){
  updatedNote = {
    super_notes: notes
  }
} else {
  updatedNote = {
    complaint_type: type,
    complaint_id: typeId,
    tenant_notes: notes
  }
}


const complaintTypeOptions = complaintTypes.map((type)=><option key={type.id} value={type.id}>{type.complaint_type}</option>)

function handleSelect(e){
  if(e.target.value!==0){
    setTypeId(e.target.value)
    const complaintType = complaintTypes.find((type)=>type.id===parseInt(e.target.value))
    setType(complaintType.complaint_type)
  }
}
function handleSubmit(e){
 
  e.preventDefault()
  fetch(`/tenant_complaints/${complaintId}`,{
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(updatedNote)
  })
  .then(r=>r.json())
  .then((data)=>{
    setComplaint(data);
    setEditWindowOn(false)
  })
  
}

  return(
    <div>
      <form onSubmit={handleSubmit}>
        {isSuper ?
        "" :
        <div id="select-type">
          <select onChange={handleSelect}>
            <option value={0}>Select Type</option>
            {complaintTypeOptions}
          </select>
        </div>}
        <input placeholder="Enter notes" onChange={(e)=>setNotes(e.target.value)} value={notes}>
        </input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}


export default EditComplaint;