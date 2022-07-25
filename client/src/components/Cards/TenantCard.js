import { useContext } from "react";
import AssignApartment from "../tenant/AssignApartment";
import { UserContext } from "../UserContext"

function TenantCard(){
  const [user] = useContext(UserContext)
  const [registered, setRegistered] = useState(false)
  const {first_name, last_name, email, phone_number, building, apartment, additional_tenants} = user
    return(
      <div>
        <h4>Tenant Information:</h4>
        <p>{first_name} {last_name}</p>
        <p>{email}, {phone_number}</p>
        {user.apartment ? 
          <div>
            <p>{user.building.address} {user.apartment.unit_number}, New York, NY</p>
          </div>
                :
          <AssignApartment/> 
                }
        
        <p>Additional tenants: {user.additional_tenants}</p>
      </div>
    )
}

export default TenantCard;