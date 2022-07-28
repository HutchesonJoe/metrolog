
import ComplaintCard from "../Cards/ComplaintCard";

function ComplaintsByDate({complaints, setComplaints}){

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