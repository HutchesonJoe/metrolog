import { useState, createContext, useEffect } from "react";

const UserContext = createContext()

function UserProvider({children}){
  const [user, setUser] = useState([])
  
  useEffect(()=>{
    fetch("/me")
    .then(r=>r.json())
    .then(data=>setUser(data))
  },[])
  
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export  { UserContext, UserProvider }