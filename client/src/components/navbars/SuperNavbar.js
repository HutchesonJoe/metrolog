import { Routes, Route, NavLink } from "react-router-dom";
import { useContext } from "react";
import SuperComplaintsByBuilding from "../super/SuperComplaintsByBuilding";
import AllSuperComplaints from "../super/AllSuperComplaints";
import ComplaintsByDate from "../super/ComplaintsByDate";
import { UserContext, } from "../UserContext";
import { useState } from "react";


function SuperNavbar(){
  const user = useContext(UserContext)
  const [complaints, setComplaints] = useState([])
  
  return(
    <div>
      <div id="navbar">
        <NavLink to="/allcomplaints" className="navlink">View All Complaints</NavLink>
        <NavLink to="/super/complaintsbybuilding" className="navlink">By Building</NavLink>
        <NavLink to="/complaintsbydate" className="navlink">By Date</NavLink>
      </div>
      <Routes>
        <Route path="/allcomplaints" element={<AllSuperComplaints user={user} complaints={complaints} setComplaints={setComplaints}/>}/>
        <Route path="/super/complaintsbybuilding" element={<SuperComplaintsByBuilding user={user}/>}/>
        <Route path="/complaintsbydate" element={<ComplaintsByDate/>}/>
      </Routes>
    </div>
  )
}

export default SuperNavbar;