import { NavLink } from "react-router-dom";


function SuperNavbar(){
  
  return(
    <div>
      <div id="navbar">
        <NavLink to="/allcomplaints" className="navlink">View All Complaints</NavLink>
        <NavLink to="/super/complaintsbybuilding" className="navlink">By Building</NavLink>
      </div>
    </div>
  )
}

export default SuperNavbar;