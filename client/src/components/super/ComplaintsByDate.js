import { useState, useEffect, useContext } from "react";
import ComplaintCard from "../Cards/ComplaintCard";
import { TenantComplaintContext } from "../TenantComplaintsContext"

function ComplaintsByDate({complaints, setComplaints}){
  // const[complaints, setComplaints] = useContext(TenantComplaintContext)
  // const[filter, setFilter] = useState("/by-date")
  console.log(complaints)

  // useEffect(()=>{
  //   fetch(filter)
  //   .then(r=>r.json())
  //   .then((data)=>{
  //     setComplaints(data);
  //   })
  // },[filter])

  function filterComplaints(e){
    console.log(e.target.value)
  }
  
  let complaintList

  if(complaints){
    complaintList = complaints.map((complaint)=><ComplaintCard key={complaint.id} tenantComplaint={complaint} complaints={complaints} setComplaints={setComplaints}/>)
  }
  
  return(
    
    <div>
      <div>
        <select onChange={filterComplaints}>
          <option value = {"/by-date"}>All Complaints</option>
          <option value = {"/open-complaints"}>Open Complaints</option>
          <option value = {"/closed-complaints"}>Closed Complaints</option>
        </select>
      </div>
      {complaintList}
    </div>
  )
}


export default ComplaintsByDate;