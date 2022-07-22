import { useContext } from "react";
import { UserContext } from "../UserContext"

function TenantCard(){
  const [user] = useContext(UserContext)
  const {first_name, last_name, email, phone_number, building, apartment, additional_tenants} = user
  return(
    <div>
      <h4>Tenant Information:</h4>
      <p>{user.first_name} {user.last_name}</p>
      <p>{user.email}, {user.phone_number}</p>
      {/* <p>{user.building.address} {user.apartment.unit_number}, New York, NY</p> */}
      <p>Additional tenants: {user.additional_tenants}</p>
    </div>
  )
}

export default TenantCard;