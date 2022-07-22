import { useContext } from "react";
import { BuildingsContext } from "../BuildingsInfo";

function TenantCard({user}){
  
  return(
    <div>
      <h4>Tenant Information:</h4>
      <p>{user.first_name} {user.last_name}</p>
      <p>{user.email}, {user.phone_number}</p>
      <p>{user.building.address} {user.apartment.unit_number}, New York, NY</p>
      <p>Additional tenants: {user.additional_tenants}</p>
    </div>
  )
}

export default TenantCard;