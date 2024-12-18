import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { AdminLog, checkSignUpButton, checkUser, login, logout, setMenu, setSuperAdmin, superAdmin } from "./stateManagement/userSlice";
import './styles/app.css';


function App() {
  const [timeReal, settimeReal] = useState([]);
  const [timeRealMinutes, settimeRealMinutes] = useState([]);
  const user = useSelector(checkUser);
  const checkButton = useSelector(checkSignUpButton);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(login(sessionStorage.getItem('authToken')));
    if (sessionStorage.getItem('admin')) {
      dispatch(AdminLog());
    }
    if(sessionStorage.getItem('superAdmin')){
      dispatch(setSuperAdmin())


    }


    const interval = setInterval(() => {
      const time = new Date();
      settimeReal(time.getHours());
      settimeRealMinutes(time.getMinutes());
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);  

  return (
    <div className="app" onClick={()=> dispatch(setMenu(null))}>
      <div title="E-commerce Management System" className="app_header">
        <h1>Ebazzar</h1>
        <h2>{timeReal >= 12 ? timeReal - 12 : timeReal}:{timeRealMinutes < 10 ? "0" : ""}{timeRealMinutes} {timeReal >= 0 && timeReal < 12 ? "AM" : "PM"}</h2>
        <h1> {(new Date()).toDateString()}</h1>
        {user && (
          <button  title="Click to logout"className="header_button" onClick={() => {
            dispatch(logout());
            sessionStorage.clear()
            window.location.pathname = ''
          }}>LogOut</button>
        )}
          


      </div>

      <div className="app_body">
        <Routes>
          <Route path="*" element={user ? <Home /> : (checkButton ? <SignUp /> : <LogIn />)} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
