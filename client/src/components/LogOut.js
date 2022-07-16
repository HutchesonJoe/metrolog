import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"

function LogOut({setUser}){
  const navigate = useNavigate()
  useEffect(()=>{
    
  },[]);
  navigate("/homepage/home", { replace: true })
}

export default LogOut;