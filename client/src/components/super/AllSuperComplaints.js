import { useEffect, useState, useContext } from "react";
import { ComplaintTypesContext } from "../ComplaintTypesInfo"
import ComplaintCard from "../Cards/ComplaintCard";
import { UserContext } from "../UserContext";
import { TenantComplaintContext } from "../TenantComplaintsContext"

function AllSuperComplaints(){
  const [user] = useContext(UserContext)
  const [complaints, setComplaints] = useContext(TenantComplaintContext)
  const types = useContext(ComplaintTypesContext)

  const [typeId, setTypeId] = useState()
  const [openOnly, setOpenOnly] = useState(false)
  const [buildings, setBuildings] = useState([])
  const [allSuperComplaints, setAllSuperComplaints] = useState([])
  
  useEffect(()=>{
    setAllSuperComplaints(complaints)
  },[complaints])

  useEffect(()=>{
    if(user && user.buildings){
      setBuildings(user.buildings)
    }
  },[user])
  
  useEffect(()=>{
    if(openOnly===true){
      const open = complaints.filter((complaint)=>complaint.resolved===false)
    
      setAllSuperComplaints(open)
    } else {
      setAllSuperComplaints(complaints)
    }
  },[openOnly])

  useEffect(()=>{
    if(buildings!==[]){
      const superComplaints = buildings.map((building)=>building.tenant_complaints);
      setComplaints(superComplaints.flat());
    }
  },[buildings])
  
  let complaintList

  if(complaints){
    let filteredComplaints = allSuperComplaints
    if(typeId){
      filteredComplaints = allSuperComplaints.filter((complaint)=>complaint.complaint_id===parseInt(typeId))
    }
    complaintList = filteredComplaints.map((complaint)=><ComplaintCard tenantComplaint={complaint} key={complaint.id}/>)
  }

  function selectType(e){
    setTypeId(parseInt(e.target.value))
  }

  const complaintTypesOptions = types.map((type)=><option key = {type.id} value={type.id}>{type.complaint_type}</option>)
  return(
    <div>
      <div>
      <label>Filter by Complaint Type: </label>
      <select onChange={selectType} name="type">
        <option>Select</option>
        {complaintTypesOptions}
      </select>
      </div>
      <div>
      <label >Show open complaints only</label>
      <input type="checkbox" name="open/close" onChange={()=>setOpenOnly(!openOnly)}/>
      </div>
      {complaintList}
      <div>
        {complaintList[0] ? "" : "No complaints of this type in this building."}
      </div>
    </div>
  )
}


export default AllSuperComplaints;
