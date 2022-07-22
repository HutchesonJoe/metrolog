import { useState, useContext, useEffect } from "react"
import { UserContext } from "../UserContext"
import { ComplaintTypesContext } from "../ComplaintTypesInfo"
import Errors from "../Errors"

function FileComplaint({complaints, setComplaints}){
  const user = useContext(UserContext)
  const complaintTypes = useContext(ComplaintTypesContext)
  console.log(complaints)
  const[complaint, setComplaint] = useState()
  const[tenantNotes, setTenantNotes] = useState("")
  const[submitOn, setSubmitOn] = useState(true)
  const[errors, setErrors] = useState([])
   
  useEffect(()=>{
    setComplaint(complaintTypes[0])
  },[])

  const complaintTypeOptions = complaintTypes.map((complaint=><option key={complaint.id} value={complaint.id}>{complaint.complaint_type}</option>))

  function handleSelectType(e){ 
    const complaintType = complaintTypes.find((complaint)=> complaint.id === parseInt(e.target.value))
    setComplaint(complaintType)
  }

  function handleSubmit(e){
    e.preventDefault()
    setSubmitOn(!submitOn)
    const tenantComplaint ={
      resolved: false,
      tenant_notes: tenantNotes,
      complaint_id: complaint.id,
      tenant_id: user.id,
      building_id: user.building.id,
      unit: user.apartment.unit_number
    }

    fetch('/tenant_complaints',{
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(tenantComplaint)
    }).then((r) => {
      if (r.ok) {
        r.json().then((data)=>{
          console.log(data)
          setComplaints([...complaints, data])
          setErrors(["Your complaint has been logged."]);
          
        })
      }
      if (!r.ok) {
        r.json().then((err) => setErrors(err.errors))
      }

    })
  }

  return(
    <div id="complaint-form">
      {submitOn ? 

      <form onSubmit={handleSubmit}>
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
      
      : ""}
        
    <Errors errors={errors}/>
    </div>
  )
}

export default FileComplaint;