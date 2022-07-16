function SuperCard({user, getComplaintInfo}){

  let buildingList

  if(user.buildings){
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

  return (
    <div>
      <h4>Super Information:</h4>
      <p>{user.first_name} {user.last_name}</p>
      <p>{user.email}, {user.phone_number}</p>
      <p>Your buildings:</p>
      <ul>
        {buildingList}
      </ul>
      
    </div>
  )
}

export default SuperCard;