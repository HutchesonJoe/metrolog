import { NavLink} from "react-router-dom";

function TenantNavbar(){

  return(
    <div>
      <div id="navbar">
        <NavLink to="/buildingcomplaints">View All Complaints in Building</NavLink>
        <NavLink to="/mycomplaints">View Complaints for Your Unit</NavLink>
        <NavLink to="/filecomplaints">File New Complaint</NavLink>
      </div>
    </div>
  )
}

export default TenantNavbar;