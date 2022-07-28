import skyline from '../images/nycskyyline.png'

function Banner(){
  return (
    <div id="App-header">
      <h1>METRONYC Properties <img src={skyline} alt= "skyline logo" id="logo"/></h1>
      <h3>Tenant Complaint Log</h3>
    </div>
  )
}

export default Banner;