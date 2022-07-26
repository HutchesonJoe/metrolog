import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuildingsContext } from "./BuildingsInfo";
import Errors from './Errors';

function Register(){
  const[isTenant, setIsTenant] = useState(true)
  const[formOn, setFormOn] = useState(false)
  const[errors, setErrors] = useState()
  const[firstName, setFirstName] = useState("")
  const[lastName, setLastName] = useState("")
  const[email, setEmail] = useState("")
  const[phoneNumber, setPhoneNumber] = useState("")
  const[additionalTenants, sestAdditionalTenants] = useState("")
  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const[passwordConfirmation, setPasswordConfirmation] = useState("")

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
          // setNewRegistration(false)
          //am I useing this?
          // if(isTenant){
          //   setTenantId(data.id)
          // }
          setErrors(["Success! Please log in."])
        });
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