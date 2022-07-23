import { useState, useContext, useEffect } from "react"
import { UserContext } from "../UserContext"
import { TenantComplaintContext } from "../TenantComplaintsContext"
import { ComplaintTypesContext } from "../ComplaintTypesInfo"
import Errors from "../Errors"

function FileComplaint({complaints, setComplaints}){
  const [user] = useContext(UserContext)
  // const [complaints, setComplaints] = useContext(TenantComplaintContext)
  const complaintTypes = useContext(ComplaintTypesContext)
  const[complaintType, setComplaintType] = useState()
  const[complaintTypeId, setComplaintTypeId] = useState()
  const[tenantNotes, setTenantNotes] = useState("")
  const[submitOn, setSubmitOn] = useState(true)
  const[errors, setErrors] = useState([])
  console.log(complaints, setComplaints)
  useEffect(()=>{
    if(complaintTypes.length!==0){
    setComplaintType(complaintTypes[0].complaint_type)
    setComplaintTypeId(complaintTypes[0].id)}
  },[complaintTypes])

  const complaintTypeOptions = complaintTypes.map((complaint=><option key={complaint.id} value={[complaint.complaint_type, complaint.id]}>{complaint.complaint_type}</option>))

  function handleSelectType(e){ 
    const compArray = (e.target.value.split(","))
    setComplaintType(compArray[0])
    setComplaintTypeId(compArray[1])
  }

  function handleSubmit(e){
    e.preventDefault()
    setSubmitOn(!submitOn)
    const tenantComplaint ={
      resolved: false,
      tenant_notes: tenantNotes,
      complaint_id: complaintType.id,
      tenant_id: user.id,
      building_id: user.building.id,
      unit: user.apartment.unit_number,
      complaint_type: complaintType,
      complaint_id: complaintTypeId
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