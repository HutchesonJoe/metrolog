import { useState, createContext, useEffect } from "react";

const BuildingsContext = createContext()

function BuildingsProvider({children}){
  const [buildings, setBuildings] = useState([])

  useEffect(()=>{
    fetch("/buildings")
    .then(r=>r.json())
    .then(data=>setBuildings(data))

  },[])
  
  return <BuildingsContext.Provider value={buildings}>{children}</BuildingsContext.Provider>
}

export  { BuildingsContext, BuildingsProvider }