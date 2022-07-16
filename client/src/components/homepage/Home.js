import { useState, useContext, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom"
import Login from "./Login";
import Register from "./Register";
import ComplaintsByBuilding from "../ComplaintsByBuilding";
import ComplaintCard from "../Cards/ComplaintCard";
import TenantInfo from "../Cards/TenantCard";
import SuperInfo from "../Cards/SuperCard";
import { BuildingsContext } from "../BuildingsInfo";
import TenantNavbar from "../navbars/TenantNavbar";
import SuperNavbar from "../navbars/SuperNavbar";


function Home(){
  const[user, setUser] = useState()
  const[buildingComplaints, setBuildingComplaints] = useState([])

  useEffect(()=>{
    
    fetch("/me").then((r)=>{
      if (r.ok){
        r.json().then((user)=>setUser(user))
      }
    })
  },[])
  

  const buildings = useContext(BuildingsContext)
  
  let userInfo

  if(user && user.apartment){
    userInfo = <TenantInfo user={user}/>
  } else if(user && user.buildings){
    
    userInfo = <SuperInfo user={user}/>
  }

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
          {userInfo}
          {user.apartment ? <TenantNavbar user={user}/> : <SuperNavbar user={user}/>}
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
        
      </Routes>
     
    </div>
  )
}

export default Home;
