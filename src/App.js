import { useEffect, useState } from "react";
// import PhotoUpload from "./components/PhotoUpload.js"
import './styles/app.css'
import LogIn from "./components/LogIn";

function App() {
  const [timeReal, settimeReal] = useState([]);
  const [timeRealMinutes, settimeRealMinutes] = useState([]);

  useEffect(()=>{
   
   const interval= setInterval(() => {
     const time=new Date();
      settimeReal(time.getHours())
      settimeRealMinutes(time.getMinutes());
      
    }, 1000);
    
    return ()=>{
      clearInterval(interval)
    }

    


  },[])
  return (
    <div className="app">
      <div title="Ecommerce Management System" className="app_header">

     <h1> EMS</h1>
     <h2> {timeReal>=12?timeReal-12:timeReal}:{timeRealMinutes<=10?"0":""}{timeRealMinutes} {(timeReal>=0 && timeReal<12)?"AM":"PM"}</h2>

      </div>
      <div className="app_body">
        <LogIn/>
      </div>

     {/* <PhotoUpload/> */}
     
    </div>
  );
}

export default App;
