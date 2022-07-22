
// import '../App.css';

import Banner from './Banner';
import Home from './homepage/Home';
import { BuildingsProvider } from "./BuildingsInfo";
import { ComplaintTypesProvider } from "./ComplaintTypesInfo";
import { UserProvider } from "./UserContext"
import { TenantComplaintProvider } from './TenantComplaintsContext';

function App() {

  return (
    <div className="App">
     
      <Banner/>
      
      <div>
          
          <TenantComplaintProvider>
            <UserProvider>
              <BuildingsProvider>
                <ComplaintTypesProvider>
                  <Home/>
                </ComplaintTypesProvider>
              </BuildingsProvider>
            </UserProvider>
          </TenantComplaintProvider>
        
      </div>
      
    </div>
  );
}

export default App;
