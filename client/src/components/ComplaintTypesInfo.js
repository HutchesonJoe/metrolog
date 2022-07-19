import { useState, createContext, useEffect } from "react";

const ComplaintTypesContext = createContext()

function ComplaintTypesProvider({children}){
  const [complaints, setComplaints] = useState([])
  
  useEffect(()=>{
    fetch("/complaints")
    .then(r=>r.json())
    .then(data=>setComplaints(data))

  },[])
  
  return <ComplaintTypesContext.Provider value={complaints}>{children}</ComplaintTypesContext.Provider>
}

export  { ComplaintTypesContext, ComplaintTypesProvider }