import { useEffect, useState, useContext } from "react";
import { ComplaintTypesContext } from "../ComplaintTypesInfo"
import ComplaintCard from "../Cards/ComplaintCard";
import { UserContext } from "../UserContext";
import { TenantComplaintContext } from "../TenantComplaintsContext"

function AllSuperComplaints(){
  const [user] = useContext(UserContext)
  const [complaints] = useContext(TenantComplaintContext)
  
  console.log(user)
  console.log(complaints)

  useEffect(()=>{
    if(user.buildings){
      setBuildings(user.buildings)
    }
  },[user])
  
  const[typeId, setTypeId] = useState()
  const[allComplaints, setAllComplaints] = useState([])

  // useEffect(()=>{
    
  //   if(buildings!==[]){
  //     const complaints = buildings.map((building)=>building.tenant_complaints);
  //     setComplaints(complaints.flat());
  //     setAllComplaints(complaints.flat())
  //   }
  // },[buildings])
  
  const complaintTypes = useContext(ComplaintTypesContext)
  
  let complaintList

  if(complaints){
    let filteredComplaints = complaints
    if(typeId){
      filteredComplaints = complaints.filter((complaint)=>complaint.complaint_id===parseInt(typeId))
    }
    complaintList = filteredComplaints.map((complaint)=><ComplaintCard tenantComplaint={complaint} key={complaint.id}/>)
  }

  function selectType(e){
    setTypeId(parseInt(e.target.value))
    const filteredComplaints = allComplaints.filter((complaint)=>complaint.complaint_id===typeId)
    // if(e.target.value==)
    // setType(e.target.value)
    // const filteredComplaints = complaints.filter((complaint)=>complaint.complaint_id===parseInt(e.target.value))
    // setComplaints(filteredComplaints)
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