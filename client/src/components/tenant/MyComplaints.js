import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import ComplaintCard from "../Cards/ComplaintCard";

function MyComplaints({complaints, setComplaints}){
  const[myComplaints, setMyComplaints] = useState([])

  const [user] = useContext(UserContext)

  useEffect(()=>{
    if(user && user.apartment){
      const filteredComplaints = complaints.filter((complaint)=>complaint.tenant_id===user.id)
      setMyComplaints(filteredComplaints)
    }
  },[user])
  
  let myComplaintList

  if(user && user.apartment){
    myComplaintList = myComplaints.map((complaint)=>{
      return <ComplaintCard tenantComplaint={complaint} key={complaint.id} setComplaints={setComplaints} complaints={complaints}/>
    })
  }

  return(
    <div>
      {myComplaintList}
    </div>
  )
}

export default MyComplaints;