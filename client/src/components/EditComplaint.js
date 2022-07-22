import { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext"

function EditComplaint({complaintId, setComplaint, isSuper}){
const[notes, setNotes] = useState("")
const user = useContext(UserContext)

// useEffect(()=>{
//   if(user.buildings){
//     setIsSuper(true)
//   }
// },[user])

let updatedNote

if(isSuper){
  updatedNote = {
    super_notes: notes
  }
} else {
  updatedNote = {
    tenant_notes: notes
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
  .then(data=>setComplaint(data))
  setNotes("")
}

  return(
    <div>
      <form onSubmit={handleSubmit}>
        {isSuper ?
        "" :
        <div id="select-type">
          <select>
            <option>Select Type</option>
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