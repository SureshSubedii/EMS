import { useEffect, useState } from "react";
// import PhotoUpload from "./components/PhotoUpload.js"
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { checkSignUpButton, checkUser, login, logout } from "./stateManagement/userSlice";
import './styles/app.css';

function App() {
  const [timeReal, settimeReal] = useState([]);
  const [timeRealMinutes, settimeRealMinutes] = useState([]);
  const user=useSelector(checkUser);
  const checkButton=useSelector(checkSignUpButton);

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(login(sessionStorage.getItem('authToken')))
   
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
     <h2> {timeReal>=12?timeReal-12:timeReal}:{timeRealMinutes<10?"0":""}{timeRealMinutes} {(timeReal>=0 && timeReal<12)?"AM":"PM"}</h2>
     <button className="header_button">Admin Login</button>
     {(user )?
     ( <button className="header_button" onClick={()=>{dispatch(logout()); sessionStorage.removeItem("authToken")}}>LogOut</button> ):''}

      </div>
      <div className="app_body">
       {(user )?(<Home/>):((checkButton)?(<SignUp/>):<LogIn/>)}
        {/* <SignUp/> */}
      </div>

     {/* <PhotoUpload/> */}
     
    </div>
  );
}

export default App;
