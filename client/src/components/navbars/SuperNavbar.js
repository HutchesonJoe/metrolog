import { Routes, Route, NavLink } from "react-router-dom"
import SuperComplaintsByBuilding from "../super/SuperComplaintsByBuilding";
import AllSuperComplaints from "../super/AllSuperComplaints";
import ComplaintsByDate from "../super/ComplaintsByDate";

function SuperNavbar({user}){
  return(
    <div>
      <div id="navbar">
        <NavLink to="/allcomplaints" className="navlink">View All Complaints</NavLink>
        <NavLink to="/super/complaintsbybuilding" className="navlink">By Building</NavLink>
        <NavLink to="/complaintsbydate" className="navlink">By Date</NavLink>
      </div>
      <Routes>
        <Route path="/allcomplaints" element={<AllSuperComplaints user={user}/>}/>
        <Route path="/super/complaintsbybuilding" element={<SuperComplaintsByBuilding/>}/>
        <Route path="/complaintsbydate" element={<ComplaintsByDate/>}/>
      </Routes>
    </div>
  )
}

export default SuperNavbar;