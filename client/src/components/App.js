
// import '../App.css';

import Banner from './Banner';
import Home from './homepage/Home';
import { BuildingsProvider } from "./BuildingsInfo";
import { ComplaintTypesProvider } from "./ComplaintTypesInfo";
import { UserProvider } from "./UserContext"

function App() {

  return (
    <div className="App">
     
      <Banner/>
      
      <div>
          <UserProvider>
            <BuildingsProvider>
              <ComplaintTypesProvider>
                <Home/>
              </ComplaintTypesProvider>
            </BuildingsProvider>
          </UserProvider>
          
        
      </div>
      
    </div>
  );
}

export default App;
