import { useState, useContext } from 'react';
import { BuildingsContext } from "../BuildingsInfo"
import Errors from '../Errors';

function Register(){
  const[isTenant, setIsTenant] = useState(true)
  const[formOn, setFormOn] = useState(false)
  const[errors, setErrors] = useState()
  const[tenantId, setTenantId] = useState()
  const[firstName, setFirstName] = useState("")
  const[lastName, setLastName] = useState("")
  const[email, setEmail] = useState("")
  const[phoneNumber, setPhoneNumber] = useState("")
  const[unit, setUnit] = useState("")
  const[additionalTenants, sestAdditionalTenants] = useState("")
  const[building, setBuilding] = useState(1)
  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const[passwordConfirmation, setPasswordConfirmation] = useState("")

  const buildings = useContext(BuildingsContext)
  

  const buildingList = buildings.map((building)=><option key={building.id} value={building.id}>{building.address}</option>)

  function handleSelectUserType(e){
    setErrors([])
    if(e.target.value==="tenant"){
      setFormOn(true)
      setIsTenant(true)
    }else if(e.target.value==="super"){
      setFormOn(true)
      setIsTenant(false)
    } else if(e.target.value==="select"){
      setFormOn(false)
    }
  }

  function setApartment(){
    const apartment = {
      building_id: building,
      unit_number: unit,
      tenant_id: tenantId
    }

    fetch("/apartments",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(apartment)
    }).then((r) => {
      if (r.ok) {
        r.json().then(()=>setErrors(["Success! Log in above."]))
      }
      if (!r.ok) {
        r.json().then((err) => setErrors(err.errors))
      }
      })
  }

  function setBuildingSuper(){
    if(building.super_id){
      setErrors(["That building already has a super."])
    }
  }
  
  function handleSubmit(e){
    e.preventDefault()
    

    let targetRoute
    let user

    if(isTenant){
      user = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        additional_tenants: additionalTenants,
        currently_occupying: true,
        username,
        password,
        password_confirmation: passwordConfirmation,
      }
      targetRoute = "/tenants"
    } else {
      user = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        username,
        password,
        password_confirmation: passwordConfirmation,
      }
      targetRoute = "/supers"
    }
    
    fetch(targetRoute,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(user)
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data)=>{
          if(isTenant){
            setTenantId(data.id)
          }
          setFormOn(false)
        });
        setErrors(["Success! Log in above."]);
        if(isTenant){
          setApartment()
        } else {
          setBuilding()
        }
        // navigate("/login", { replace: true })
      }
      if (!r.ok) {
        r.json().then((err) => setErrors(err.errors))
      }
    });
    
  }
    
  return(
    
    <div id="register">
      <div>
      <label>I am a new: </label>
      <select onChange={handleSelectUserType}>
        <option value={"select"}>Select:</option>
        <option value={"tenant"}>Tenant</option>
        <option value={"super"}>Superintendent</option>
      </select>
      </div>
            
       <div>
        {formOn ? 
          <form onSubmit={handleSubmit}>
            {isTenant ? 
            <div>
              <label>Select building:</label>
              <select onChange={(e)=>setBuilding(e.target.value)}>
              {buildingList}
              </select> 
            </div>
            
            : ""}
            <div>
              <label> First Name: </label>
              <input type="text" onChange={(e)=>setFirstName(e.target.value)}></input>
            </div>
            <div>
              <label> Last Name: </label>
              <input type="text" onChange={(e)=>setLastName(e.target.value)}></input>
            </div>
            <div>
              <label> Email: </label>
              <input type="text" onChange={(e)=>setEmail(e.target.value)}></input>
            </div>
            <div>
              <label> Phone: </label>
              <input type="text" onChange={(e)=>setPhoneNumber(e.target.value)}></input>
            </div>
            <div>
              <label> User Name: </label>
              <input type="text" onChange={(e)=>setUsername(e.target.value)}></input>
            </div>
            <div>
              <label> Password: </label>
              <input type="password" onChange={(e)=>setPassword(e.target.value)}></input>
            </div>
            <div>
              <label> Password Confirmation: </label>
              <input type="password" onChange={(e)=>setPasswordConfirmation(e.target.value)}></input>
            </div>
          {isTenant ? 
            <div>
              <div>
                <label>Unit Number:</label>
                <input type="text" onChange={(e)=>setUnit(e.target.value)}></input>
              </div>
              <div>
                <label>Additional Tenant (full name; if multiple, separate with commas):</label>
                <input type="text" onChange={(e)=>sestAdditionalTenants(e.target.value)}></input>
              </div>
              

            </div>
           
            : 
            ""}
            <button type="submit">Submit</button>
          </form>
        : ""}
       
        </div>
        <div>
          <Errors errors = {errors}/>
        </div>
    </div>
  )
}

export default Register; 