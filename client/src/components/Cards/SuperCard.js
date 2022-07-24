import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import AssignBuilding from "../super/AssignBuilding";

function SuperCard(){
  const [user] = useContext(UserContext)
  const [noBuildings, setNoBuildings] = useState(true)
   
  let buildingList

  useEffect(()=>{
    if(user.buildings){
      if(user.buildings.length===0){
        setNoBuildings(true)
      } else {
        setNoBuildings(false)
      }
    buildingList = user.buildings.map((b)=>{
    let isPlural
    if(b.tenant_complaints.length===1){
      isPlural = false
    } else {
      isPlural = true
    }
    return <li key={b.id}>{b.address}, {b.tenant_complaints.length} {isPlural ? "complaints" : "complaint"}</li>
  })
  }
  },[])
  

  return (
    <div>
      <h4>Super Information:</h4>
      <p>{user.first_name} {user.last_name}</p>
      <p>{user.email}, {user.phone_number}</p>
      <p>Your buildings:</p>
      <div>
        {noBuildings ? "No buildings assigned to you. Select a building below." : "Add another building below."}
      </div>
      <div>
        <AssignBuilding/>
      </div>
     
      <ul>
        {buildingList}
      </ul>
      
    </div>
  )
}

export default SuperCard;