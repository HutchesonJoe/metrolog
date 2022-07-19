// import { useState, createContext, useEffect } from "react";

// const TenantComplaintContext = createContext()

// function TenantComplaintProvider({children}){
//   const [complaints, setComplaints] = useState([])
  
//   useEffect(()=>{
//     fetch("/tenant_complaints")
//     .then(r=>r.json())
//     .then(data=>setComplaints(data))

//   },[])
  
//   return <TenantComplaintContext.Provider value={complaints}>{children}</TenantComplaintContext.Provider>
// }

// export  { TenantComplaintContext, TenantComplaintProvider }