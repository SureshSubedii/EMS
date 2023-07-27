import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { AdminLog, AdminLogOut, checkSignUpButton, checkUser, login, logout } from "./stateManagement/userSlice";
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
    <div className="app">
      <div title="E-commerce Management System" className="app_header">
        <h1>EMS</h1>
        <h2>{timeReal >= 12 ? timeReal - 12 : timeReal}:{timeRealMinutes < 10 ? "0" : ""}{timeRealMinutes} {timeReal >= 0 && timeReal < 12 ? "AM" : "PM"}</h2>
        {user && (
          <button className="header_button" onClick={() => {
            dispatch(logout());
            sessionStorage.clear()
            // sessionStorage.removeItem("authToken");
            // sessionStorage.removeItem('admin');
            // sessionStorage.removeItem('uploader');

            dispatch(AdminLogOut());
          }}>LogOut</button>
        )}
      </div>

      <div className="app_body">
        <Routes>
          <Route path="/*" element={user ? <Home /> : (checkButton ? <SignUp /> : <LogIn />)} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
