
// import '../App.css';
import Login from './Login';
import Banner from './Banner'
import Home from './homepage/Home'
import { useState } from 'react';

import { Routes, Route, useNavigate, NavLink } from "react-router-dom";

function App() {
  const [loginOn, setLoginOn] = useState(false)
  const [homePageOn, setHomePageOn] = useState(false)
  const navigate = useNavigate()


  function handleClick(){
    setLoginOn(!loginOn)
    // navigate("./login", {replace: true})
  }

  return (
    <div className="App">
     
      <Banner/>
      <Home/>
      <NavLink to="/login" >Login</NavLink>
      {/* <button onclick={handleClick}>Enter</button> */}
      <div>
        {/* This will be a route */}
      {/* {loginOn ? <Login homePageOn={homePageOn} setHomePageOn={setHomePageOn}/> : <p className="App-header" onClick={handleClick}>Enter</p>} */}
      </div>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
