import { useState, useContext, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom"
import Login from "./Login";
import Register from "./Register";
import ComplaintsByBuilding from "../ComplaintsByBuilding";
import TenantCard from "../Cards/TenantCard";
import SuperCard from "../Cards/SuperCard";
import { TenantComplaintContext } from "../TenantComplaintsContext";
import TenantNavbar from "../navbars/TenantNavbar";
import SuperNavbar from "../navbars/SuperNavbar";
import { UserContext } from "../UserContext";
import AllSuperComplaints from "../super/AllSuperComplaints";
import SuperComplaintsByBuilding from "../super/SuperComplaintsByBuilding";
import ComplaintsByDate from "../super/ComplaintsByDate";
import BuildingComplaints from "../tenant/BuildingComplaints";
import MyComplaints from "../tenant/MyComplaints";
import FileComplaint from "../tenant/FileComplaint";

function Home(){

const [user, setUser] = useContext(UserContext)
const [complaints, setComplaints] = useContext(TenantComplaintContext)
const [isSuper, setIsSuper] = useState()
console.log(user)
  useEffect(()=>{
    fetch("/me").then((r)=>{
      if (r.ok){
        r.json().then((user)=>setUser(user))
      }
    })
  },[])
  
  
  let userInfo

  useEffect(()=>{
    if(user && user.buildings){
      setIsSuper(true)
    } else {
      setIsSuper(false)
    }
  // if(user && user.apartment){
  //   userInfo = <TenantCard/>
  //   setComplaints(user.building.tenant_complaints)
  // } else if(user && user.buildings){
  //   userInfo = <SuperCard/>
  //   const superComplaints = user.buildings.map((building)=>building.tenant_complaints).flat()
  //   setComplaints(superComplaints)
  // }
}
  ,[user])
  

  function handleLogout(){
    fetch("/logout", {
      method: 'DELETE'
    }).then((r)=>{
      if (r.ok){
        setUser(null);
      }
    })
  }


  return(

    <div id="home">

      {user 
        ? 
        <div>
          <p>Welcome, {user.first_name}  
          <button onClick={handleLogout}>Logout</button>
          </p>
          {isSuper ? <SuperCard/> : <TenantCard/>}
          {user.apartment ? <TenantNavbar/> : <SuperNavbar/>}
        </div>
        : 
      <div id="login-window">
        <div>Existing Tenant/Superintendent? <NavLink to="/login" > Login </NavLink></div>
        <div>New to METROlog? <NavLink to="/register">Register</NavLink></div>
        <div>Prospective tenants?<NavLink to="/complaintsbybuilding">Veiw Complaints in All Buildings</NavLink></div>
      </div>
      }
      
      <Routes>
        <Route exact path="/login" element={<Login setUser={setUser}/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/complaintsbybuilding" element={<ComplaintsByBuilding/>}/>
        <Route exact path="/homepage/home" element={<Home/>}/>
        <Route path="/allcomplaints" element={<AllSuperComplaints complaints={complaints} setComplaints={setComplaints}/>}/>
        <Route path="/super/complaintsbybuilding" element={<SuperComplaintsByBuilding />}/>
        <Route path="/complaintsbydate" element={<ComplaintsByDate/>}/>
        <Route exact path="/buildingcomplaints" element={<BuildingComplaints complaints={complaints} setComplaints={setComplaints}/>}/>
        <Route exact path="/mycomplaints" element={<MyComplaints complaints={complaints} setComplaints={setComplaints}/>}/>
        <Route exact path="/filecomplaints" element={<FileComplaint complaints={complaints} setComplaints={setComplaints}/>}/>
      </Routes>
     
    </div>
  )
}

export default Home;
