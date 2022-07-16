
// import '../App.css';

import Banner from './Banner';
import Home from './homepage/Home';
import { BuildingsProvider } from "./BuildingsInfo";
import { ComplaintTypesProvider } from "./ComplaintTypesInfo"

function App() {

  return (
    <div className="App">
     
      <Banner/>
      
      <div>
        
          <BuildingsProvider>
          <ComplaintTypesProvider>
            <Home/>
          </ComplaintTypesProvider>
          </BuildingsProvider>
        
      </div>
      
    </div>
  );
}

export default App;
