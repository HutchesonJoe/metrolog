import {Routes, Route, NavLink} from "react-router-dom";
import LogOut from "../LogOut";
import MyComplaints from "../tenant/MyComplaints";
import FileComplaint from "../tenant/FileComplaint";
import BuildingComplaints from '../tenant/BuildingComplaints';

function TenantNavbar({user}){
  return(
    <div>
      <div id="navbar">
        <NavLink to="/buildingcomplaints">View All Complaints in Building</NavLink>
        <NavLink to="/mycomplaints">View Complaints for Your Unit</NavLink>
        <NavLink to="/filecomplaints">File New Complaint</NavLink>
      </div>
      <Routes>
        <Route exact path="/buildingcomplaints" element={<BuildingComplaints/>}/>
        <Route exact path="/mycomplaints" element={<MyComplaints/>}/>
        <Route exact path="/filecomplaints" element={<FileComplaint/>}/>
      </Routes>
    </div>
  )
}

export default TenantNavbar;