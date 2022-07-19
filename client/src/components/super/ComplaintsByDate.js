import { useState, useEffect } from "react";
import ComplaintCard from "../Cards/ComplaintCard";

function ComplaintsByDate(){
  const[complaints, setComplaints] = useState([])
  // const[filteredComplaints, setFilteredComplaints] = useState()
  const[filter, setFilter] = useState("/by-date")

  useEffect(()=>{
    fetch(filter)
    .then(r=>r.json())
    .then((data)=>{
      setComplaints(data);
      // setFilteredComplaints(data)
    })
  },[filter])

  // function setAllComplaints(){
  //   fetch("/by-date")
  //   .then(r=>r.json())
  //   .then((data)=>setComplaints(data))
  // }
  
  
  function filterComplaints(e){
   setFilter(e.target.value)
  }

  let complaintList

  if(complaints.length!==0){
    complaintList = complaints.map((complaint)=><ComplaintCard key={complaint.id} tenantComplaint={complaint}/>)
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