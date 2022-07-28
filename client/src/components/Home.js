import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import TenantCard from "./Cards/TenantCard";
import SuperCard from "./Cards/SuperCard";
import TenantNavbar from "./navbars/TenantNavbar";
import SuperNavbar from "./navbars/SuperNavbar";
import { UserContext } from "./UserContext";
import AllSuperComplaints from "./super/AllSuperComplaints";
import SuperComplaintsByBuilding from "./super/SuperComplaintsByBuilding";
import BuildingComplaints from "./tenant/BuildingComplaints";
import MyComplaints from "./tenant/MyComplaints";
import FileComplaint from "./tenant/FileComplaint";

function Home(){

const [user, setUser] = useContext(UserContext)
const [complaints, setComplaints] = useState([])
const [isSuper, setIsSuper] = useState()

const navigate = useNavigate()

useEffect(()=>{
    if(user && user.buildings){
      setIsSuper(true)
    } else {
      setIsSuper(false)
    }
  },[user])


  useEffect(()=>{
    if(user && user.buildings){
      const superComplaints = user.buildings.map((building)=>building.tenant_complaints).flat()
      setComplaints(superComplaints)
    } else if(user && user.apartment){
      setComplaints(user.building.tenant_complaints)
    }
  },[user])

  function handleLogout(){
    fetch("/logout", {
      method: 'DELETE'
    }).then((r)=>{
      if (r.ok){
        setUser(null);
        navigate("/")
      }
    })
  }

  return(
    <div id="home">
        <div>
          {user ? <p id="welcome">Welcome, {user.first_name} <button onClick={handleLogout}>Logout</button></p> : ""}
          {isSuper ? <SuperCard/> : <TenantCard setComplaints = {setComplaints}/>}
          {isSuper ? <SuperNavbar/> : <TenantNavbar/>}
        </div>
      
      <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route path="/allcomplaints" element={<AllSuperComplaints complaints={complaints} setComplaints={setComplaints}/>}/>
        <Route path="/super/complaintsbybuilding" element={<SuperComplaintsByBuilding complaints={complaints} setComplaints={setComplaints}/>}/>
        
        <Route exact path="/buildingcomplaints" element={<BuildingComplaints complaints={complaints} setComplaints={setComplaints}/>}/>
        <Route exact path="/mycomplaints" element={<MyComplaints complaints={complaints} setComplaints={setComplaints}/>}/>
        <Route exact path="/filecomplaints" element={<FileComplaint complaints={complaints} setComplaints={setComplaints}/>}/>
       
      </Routes>
     
    </div>
  )
}

export default Home;