import { useState } from "react"

function SuperAddNote({complaintId, setComplaint}){
const[notes, setNotes] = useState("")

function handleSubmit(e){
  e.preventDefault()
  fetch(`/tenant_complaints/${complaintId}`,{
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({
      super_notes: notes
    })
  })
  .then(r=>r.json())
  .then(data=>setComplaint(data))
  setNotes("")
}

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Enter notes" onChange={(e)=>setNotes(e.target.value)} value={notes}>
        </input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SuperAddNote;