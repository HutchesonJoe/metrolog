import { useState, useContext} from "react"
import { UserContext } from "../UserContext"
import { ComplaintTypesContext } from "../ComplaintTypesInfo"

function FileComplaint(){
  const user = useContext(UserContext)
  const complaintTypes = useContext(ComplaintTypesContext)
  const[complaint, setComplaint] = useState()
  const[tenantNotes, setTenantNotes] = useState("")

  const complaintTypeOptions = complaintTypes.map((complaint=><option key={complaint.id} value={complaint.id}>{complaint.complaint_type}</option>))

  function handleSelectType(e){ 
    const complaint = complaintTypes.find((complaint)=> complaint.id === parseInt(e.target.value))
    setComplaint(complaint)
  }

  return(
    <div id="complaint-form">
      <form>
        <div>
          <label>Select Complaint Type:</label>
          <select onChange={handleSelectType}>
            {complaintTypeOptions}
          </select>
        </div>
        <div>
        <textarea onChange={((e)=>setTenantNotes(e.target.value))}></textarea>
        </div>
        
        
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default FileComplaint;