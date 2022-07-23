import { useState, createContext, useEffect } from "react";
import Home from "./homepage/Home"

const UserContext = createContext()

function UserProvider({children}){
  const [user, setUser] = useState()
 
  // useEffect(()=>{
  //   fetch("/me")
  //   .then(r=>r.json())
  //   .then(data=>{
  //     console.log("user context fired")
  //     setUser(data)
  //   })
  // },[])
  
  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>
}

export  { UserContext, UserProvider }