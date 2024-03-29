import Banner from './Banner';
import Home from './Home';
import { useContext, useEffect, useState } from 'react';
import { BuildingsProvider } from "./BuildingsInfo";
import { ComplaintTypesProvider } from "./ComplaintTypesInfo";
import { UserContext } from "./UserContext"
import { TenantComplaintProvider } from './TenantComplaintsContext';
import ComplaintsByBuilding from './ComplaintsByBuilding';
import Enter from './Enter';


function App() {
  const [homeOn, setHomeOn] = useState(false)
  const [mapOn, setMapOn] = useState(false)
  const [isSuper, setIsSuper] = useState()
  const [user, setUser] = useContext(UserContext)
  
  
  useEffect(()=>{
    fetch("/me").then((r)=>{
      if (r.ok){
        r.json().then((me)=>{
          setUser(me);
        })
      }
    })
  },[])

  useEffect(()=>{
    if(user){
      setHomeOn(true);
      if(user.buildings){
        setIsSuper(true)
      }
    } else {setHomeOn(false)}
  },[user])

  return (
    <div className="App">
     
      <Banner/>
      <div>
          
          <TenantComplaintProvider>
              <BuildingsProvider>
                <ComplaintTypesProvider>
                  {homeOn ? <Home setHomeOn={setHomeOn} isSuper={isSuper}/>: <Enter setUser={setUser}/>}
                  <button onClick={()=>setMapOn(!mapOn)}>{mapOn ? "Close map" : "Click to see an interactive map of all properties."}</button>
                  {mapOn ? <ComplaintsByBuilding/> : <div></div>}
                </ComplaintTypesProvider>
              </BuildingsProvider>
          </TenantComplaintProvider>
        
      </div>
      
    </div>
  );
}

export default App;
