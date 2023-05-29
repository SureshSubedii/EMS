import { useEffect, useState } from "react";
// import PhotoUpload from "./components/PhotoUpload.js"
import './styles/app.css'
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, logout } from "./stateManagement/userSlice";
import Home from "./components/Home";

function App() {
  const [timeReal, settimeReal] = useState([]);
  const [timeRealMinutes, settimeRealMinutes] = useState([]);
  const user=useSelector(checkUser);
  const dispatch=useDispatch();

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
      <div title="E-commerce Management System" className="app_header">

     <h1> EMS</h1>
     <h2> {timeReal>=12?timeReal-12:timeReal}:{timeRealMinutes<=10?"0":""}{timeRealMinutes} {(timeReal>=0 && timeReal<12)?"AM":"PM"}</h2>
     <button>Admin Login</button>
     {user?
     ( <button onClick={()=>{dispatch(logout()); sessionStorage.setItem("authToken",false)}}>LogOut</button> ):''}

      </div>
      <div className="app_body">
       {user?(<Home/>):(<LogIn/>)}
        {/* <SignUp/> */}
      </div>

     {/* <PhotoUpload/> */}
     
    </div>
  );
}

export default App;
