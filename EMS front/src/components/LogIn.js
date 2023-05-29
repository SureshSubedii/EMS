import React from "react";
import "../styles/login.css";
import { useForm } from "react-hook-form";
import {  RemoveRedEyeRounded, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from "../stateManagement/userSlice";
import { useEffect } from "react";
import SignUp from "./SignUp";



function LogIn() {
  const [clicked,setClicked]=useState(false);
  const dispatch=useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin =  async(data) => { 
    const result=await fetch("http://192.168.18.177:5000/userLogin", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Send form data as JSON
  })
  const responseText= await result.text();
const fetchedResults=  await JSON.parse(responseText);
 {fetchedResults.error && alert(fetchedResults.error)}
// {fetchedResults.token && alert("successful")}
// sessionStorage.setItem('authToken',fetchedResults?.token);
sessionStorage.setItem('authToken',true);
dispatch(login(sessionStorage.getItem('authToken')))




}

  // useEffect(() => {


  // }, [])
  
  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onLogin)}>
        <input
          name="email"
          className="credential"
          placeholder="Enter Email"
          type="email"
          {...register("email", { required: "Email is required!" })}
        />
        {errors.email && <p> {errors.email.message}</p>}
        <input
          name="password"
          className="credential"
          placeholder="Enter Password"
          type={clicked?"text":"password"}
          {...register("password", { required: "Password is required!" })}
        />
        {!clicked?(<VisibilityOff onClick={()=>setClicked(!clicked)} className='showHideIcon'/>)
        :(<RemoveRedEyeRounded className='showHideIcon' onClick={()=>setClicked(!clicked)}/>)}

        {errors.password && <p> {errors.password.message}</p>}
        <div className="form_buttons">
          <input type="submit" value="Login" />
          <h2 htmlFor="signUp">Not a member? Click on SignUp</h2>
          <input id="signUp" onClick={} type="button" value="SignUp" />
        </div>
        ``
      </form>
    </div>
  );
}

export default LogIn;
