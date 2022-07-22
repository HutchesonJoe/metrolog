import { useState, useEffect } from "react";
import ComplaintCard from "../Cards/ComplaintCard";

function ComplaintsByDate({ setComplaint}){

  const[complaints, setComplaints] = useState()
  const[filter, setFilter] = useState("/by-date")

  useEffect(()=>{
    fetch(filter)
    .then(r=>r.json())
    .then((data)=>{
      setComplaints(data);
    })
  },[filter])
  

  function filterComplaints(e){
   setFilter(e.target.value)
  }

  let complaintList

  if(complaints){
    complaintList = complaints.map((complaint)=><ComplaintCard key={complaint.id} tenantComplaint={complaint} setComplaint={setComplaint}/>)
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