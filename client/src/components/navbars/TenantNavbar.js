import {Routes, Route, NavLink} from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext, } from "../UserContext";

function TenantNavbar(){
  const [user] = useContext(UserContext)
   
  // useEffect(()=>{
  //   if(user && user.building){
  //     setComplaints(user.building.tenant_complaints)
  //   }
  // },[user])

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