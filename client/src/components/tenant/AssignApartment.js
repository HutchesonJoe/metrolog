import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { BuildingsContext } from '../BuildingsInfo';
import { UserContext } from '../UserContext';
import Errors from '../Errors';

function AssignApartment({setApartment}){
  const buildings = useContext(BuildingsContext)
  const [user, setUser] = useContext(UserContext)
  const[building, setBuilding] = useState()
  const[unit, setUnit] = useState()
  const[errors, setErrors] = useState([])
  
  const navigate = useNavigate()

  useEffect(()=>{
    if(buildings.length!==0){
      setBuilding(buildings[0].address)
    }
  },[buildings])

  const buildingOptions = buildings.map((building)=><option key={building.id}>{building.address}</option>)

  function handleSubmit(e){
    e.preventDefault()
    const thisBuilding = buildings.find((bldng)=>bldng.address===building)
    const apartment = {
      building_id: thisBuilding.id,
      unit_number: unit,
      tenant_id: user.id
    }

    fetch("/apartments",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(apartment)
    }).then((r) => {
      if (!r.ok) {
        r.json().then((err) => setErrors(err.errors))
      } else {
        r.json().then(data=>{
          setApartment(data);
          setUser(data.tenant)
        })
      }
      })
    
  }
  return(
    <div>
      <p>Register your apartment:</p>
      <form onSubmit={handleSubmit}>
        <select onChange={(e)=>setBuilding(e.target.value)}>
          {buildingOptions}
        </select>
        <label>Unit number:</label>
        <input onChange={(e)=>setUnit(e.target.value)}></input>
        <button type="submit">Submit</button>
      </form>
      <div>
        <Errors errors={errors}/>
      </div>
    </div>
  )
}

export default AssignApartment

// function setApartment(){
//   console.log(tenantId)
 
// }