import { useContext, useState, useEffect } from "react";
import AssignApartment from "../tenant/AssignApartment";
import { UserContext } from "../UserContext"

function TenantCard(){
    const [user] = useContext(UserContext)
    const [apartment, setApartment] = useState()
   
    useEffect(()=>{
      if(user && user.apartment){
        setApartment(user.apartment);
      }
    },[user])

    useEffect(()=>{

    })

    if(user && apartment){
      return(
        <div id="tenant-super-card">
          <h4>Tenant Information:</h4>
          <h3>{user.first_name} {user.last_name}</h3>
          <p>Additional tenants: {user.additional_tenants}</p>
          <p>{user.email}, {user.phone_number}</p>
          {apartment ? <p>{apartment.building.address} {apartment.unit_number}, New York, NY</p> : ""}
        </div>
      )
    } else if(user && !apartment){
      return(
        <AssignApartment setApartment={setApartment}/>
      )
    }else {
      return(
        <div></div>
      )
    }
  
}

export default TenantCard;