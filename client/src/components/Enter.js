import Login from "./Login";
import Register from "./Register";

function Enter({setUser}){
 return(
    <div>
      <Login setUser={setUser}/>
      <Register setUser={setUser}/>
    </div>
 )
}

export default Enter