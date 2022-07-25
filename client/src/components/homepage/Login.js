import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "../Errors";

function Login({setUser}){
  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("");
  const[isSuper, setIsSuper] = useState(false)
  const[errors, setErrors] = useState([]);

  const navigate = useNavigate()

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
        navigate(-1, { replace: true })
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
          setUser(null);
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
          <input type="text" onChange={(e)=>setUsername(e.target.value)}></input>
        </div>
        <div>
          <label>Password: </label>
          <input type="password" onChange={(e)=>setPassword(e.target.value)}></input>
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