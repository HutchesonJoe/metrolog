import { useState, createContext } from "react";

const TenantComplaintContext = createContext()

function TenantComplaintProvider({children}){
  const [complaints, setComplaints] = useState([])
  
  return <TenantComplaintContext.Provider value={[complaints, setComplaints]}>{children}</TenantComplaintContext.Provider>
}

export  { TenantComplaintContext, TenantComplaintProvider }