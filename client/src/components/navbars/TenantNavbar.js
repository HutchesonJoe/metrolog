import {Routes, Route, NavLink} from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext, } from "../UserContext";
import MyComplaints from "../tenant/MyComplaints";
import FileComplaint from "../tenant/FileComplaint";
import BuildingComplaints from '../tenant/BuildingComplaints';

function TenantNavbar(){
  const [user] = useContext(UserContext)
  const [complaints, setComplaints] = useState([])
  console.log(user.building.tenant_complaints)
  useEffect(()=>{
    if(user && user.building){
      setComplaints(user.building.tenant_complaints)
    }
  },[user])

  return(
    <div>
      <div id="navbar">
        <NavLink to="/buildingcomplaints">View All Complaints in Building</NavLink>
        <NavLink to="/mycomplaints">View Complaints for Your Unit</NavLink>
        <NavLink to="/filecomplaints">File New Complaint</NavLink>
      </div>
      <Routes>
        <Route exact path="/buildingcomplaints" element={<BuildingComplaints complaints={complaints} setComplaints={setComplaints}/>}/>
        <Route exact path="/mycomplaints" element={<MyComplaints complaints={complaints} setComplaints={setComplaints}/>}/>
        <Route exact path="/filecomplaints" element={<FileComplaint complaints={complaints} setComplaints={setComplaints}/>}/>
      </Routes>
    </div>
  )
}

export default TenantNavbar;