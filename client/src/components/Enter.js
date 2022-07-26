import Login from "./Login";
import Register from "./Register";

function Enter({setUser}){
 return(
    <div>
      <Login setUser={setUser}/>
      <Register/>
    </div>
 )
}

export default Enter