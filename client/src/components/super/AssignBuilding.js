import { useContext, useEffect, useState } from "react";
import { BuildingsContext } from "../BuildingsInfo";
import { UserContext } from "../UserContext";

function AssignBuilding({superBuildings, setSuperBuildings}){
  
  const [buildings, setBuildings] = useContext(BuildingsContext)
  const [user] = useContext(UserContext)
  const [buildingOptions, setBuildingOptions] = useState([])
  const [buildingId, setBuildingId] = useState()
  const [error, setError] = useState("")
   
  useEffect(()=>{
    if(buildings){
     setBuildingOptions(buildings.map((building)=><option key={building.id} value={building.id}>{building.address}</option>))
    }
  },[buildings])

  useEffect(()=>{
    if(buildings && buildings.length!==0){
      setBuildingId(buildings[0].id)
    }
  },[buildings])

  function handleSubmit(e){
    e.preventDefault()
    const building = buildings.find((b)=>b.id===parseInt(buildingId))
    if(building.super.first_name!=="nosuper"){
      setError("This building already has a superintendent.")
    } else {
      const assignConfirm = window.confirm("Are you sure you want to be assigned to this building? Confirm for 'Yes', cancel for 'no'.")
      if(assignConfirm){
        setError("")
        fetch(`/buildings/${buildingId}`,{
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({
            super_id: user.id
          })
        })
          .then(r=>r.json())
          .then(data=>{
            const newBuildings = buildings.filter((b)=>b.id!==data.id)
            newBuildings.push(data)
            setBuildings(newBuildings)
            setSuperBuildings([...superBuildings, data])
            
          })
      }
    }
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <select onChange={(e)=>setBuildingId(e.target.value)}>
          {buildingOptions}
        </select>
        <p>{error}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AssignBuilding