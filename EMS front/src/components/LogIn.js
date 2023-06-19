import { RemoveRedEyeRounded, VisibilityOff } from '@mui/icons-material';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SignUpButton, login } from "../stateManagement/userSlice";
import "../styles/login.css";



function LogIn() {
  const [clicked,setClicked]=useState(false);
  const dispatch=useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin =  async(data) => { 
    try{
    const result=await fetch("http://192.168.18.177:5000/userLogin", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Send form data as JSON
  })
  const responseText= await result.text();
const fetchedResults=  await JSON.parse(responseText);
if(fetchedResults?.error){
  alert(fetchedResults.error);
}
else if(fetchedResults?.token){
  sessionStorage.setItem('authToken',fetchedResults.token);
  dispatch(login(sessionStorage.getItem('authToken')))

}}
catch(error){
console.error(error)
alert(error)}
}


  
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
          <input id="signUp" onClick={()=>dispatch(SignUpButton())} type="button" value="SignUp" />
        </div>
        ``
      </form>
    </div>
  );
}

export default LogIn;
