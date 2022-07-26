import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import AssignBuilding from "../super/AssignBuilding";

function SuperCard(){
  const [user] = useContext(UserContext)
  const [noBuildings, setNoBuildings] = useState(true)
  const [superBuildings, setSuperBuildings] = useState([])
  const [buildingList, setBuildingList] = useState([])
  
  useEffect(()=>{
    if(user && user.buildings){
      setSuperBuildings(user.buildings)
      if(user.buildings.length===0){
        setNoBuildings(true)
      } else {
        setNoBuildings(false)
      }
    }
  },[user])

  useEffect(()=>{
    if(superBuildings.length!==0){
      const superBuildingList = superBuildings.map((b)=>{
      let isPlural
      if(b.tenant_complaints.length===1){
        isPlural = false
      } else {
        isPlural = true
      }
    return <li key={b.id}>{b.address}, {b.tenant_complaints.length} {isPlural ? "complaints" : "complaint"}</li>
      })
      setBuildingList(superBuildingList)
    }
  },[superBuildings])
  
  if(user){
  return (
    
    <div>
      <h4>Super Information:</h4>
      <p>{user.first_name} {user.last_name}</p>
      <p>{user.email}, {user.phone_number}</p>
      <p>Your buildings:</p>
      <ul>
        {buildingList}
      </ul>
      <div>
        {noBuildings ? "No buildings assigned to you. Select a building below." : "Add another building below."}
      </div>
      <div>
        <AssignBuilding superBuildings={superBuildings} setSuperBuildings={setSuperBuildings}/>
      </div>
    </div>
  )
  } else {
    return(
      <div></div>
    )
  }
}

export default SuperCard;