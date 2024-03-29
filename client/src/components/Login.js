import { useState } from "react";
import Errors from "./Errors";

function Login({setUser}){
  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("");
  const[isSuper, setIsSuper] = useState(false)
  const[errors, setErrors] = useState([]);
  

  function handleLogin(e){
    e.preventDefault()
    
    const user = {username, password, isSuper}
    
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    }).then((r)=> {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
          setUser(null);
          setUsername("");
          setPassword("")
        })
      }
    })
   
  }

  return(
    <div id="login">

      <form onSubmit={handleLogin}>
      <div>
          <label>I am a current: </label>
          <select onChange={()=>setIsSuper(!isSuper)}>
            <option value={false}>Tenant</option>
            <option value={true}>Superintendent</option>
          </select>
        </div>
        <div>
          <label>Username: </label>
          <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username}></input>
        </div>
        <div>
          <label>Password: </label>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}></input>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div>
          <Errors errors = {errors}/>
        </div>
      </form>
     
    </div>
  )
}

export default Login;