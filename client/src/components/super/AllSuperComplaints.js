import { useEffect, useState, useContext } from "react";
import { ComplaintTypesContext } from "../ComplaintTypesInfo"
import { BuildingsContext } from "../BuildingsInfo"
import ComplaintCard from "../Cards/ComplaintCard";

function AllSuperComplaints({user}){
  const [complaints, setComplaints] = useState([])
  const complaintTypes = useContext(ComplaintTypesContext)
  const buildings = user.buildings
  const allComplaints = buildings.map((building)=>building.tenant_complaints)
  
  useEffect(()=>{
    setComplaints(allComplaints.flat())
  },[])
  
  let complaintList

  if(complaints){
    complaintList = complaints.map((complaint)=><ComplaintCard tenantComplaint={complaint} key={complaint.id}/>)
  }

  function selectType(e){
    setComplaints(allComplaints.flat())
    const filteredComplaints = complaints.filter((complaint)=>complaint.complaint_id===parseInt(e.target.value))
    setComplaints(filteredComplaints)
  }

  const complaintTypesOptions = complaintTypes.map((type)=><option key = {type.id} value={type.id}>{type.complaint_type}</option>)

  return(
    <div>
      <div>
      <label>Filter by Complaint Type: </label>
      <select onChange={selectType}>
        <option>Select</option>
        {complaintTypesOptions}
      </select>
      </div>
      {complaintList}
    </div>
  )
}


export default AllSuperComplaints;
// function getComplaintInfo(e){
      
//   setBuildingComplaints(buildings.find((b)=>b.id===parseInt(e.target.value)).tenant_complaints);
// }
// buildingComplaintInfo = buildingComplaints.map((complaint)=>{
//   return <ComplaintCard tenantComplaint={complaint}/>
// })