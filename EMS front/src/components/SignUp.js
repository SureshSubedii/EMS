import React from 'react'
import {useForm} from 'react-hook-form'
import '../styles/signUp.css'
import {  RemoveRedEyeRounded, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

function SignUp() {
  const [clicked,setClicked]=useState(false);
  const {handleSubmit,register,formState:{errors}}=useForm();
  
  const onSignUp= async(data)=>{
    const result=await fetch("http://192.168.18.177:5000/userSignUp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data), // Send form data as JSON
    })
  // console.log(result.text())

  }
  return (
    <div className='signUp'>
      <h2>Register to EMS</h2>
      <form onSubmit={handleSubmit(onSignUp)}>
        <input
          name="email"
          className="credential"
          placeholder="Enter Email"
          type="email"
          {...register("email", { required: "Email is required!" })}
        />
        {errors.email && <p> {errors.email.message}</p>}
        <input
          name="name"
          className="credential"
          placeholder="Enter full name"
          type="text"
          {...register("name", { required: "Name is required!" })}
        />
        {errors.name && <p> {errors.name.message}</p>}
      
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
        <input
          name="contact"
          className="credential"
          placeholder="Enter contact number"
          type="number"
          {...register("contact", { required: "Contact is required!" })}
        />
        {errors.contact && <p> {errors.contact.message}</p>}

        <input
          name="address"
          className="credential"
          placeholder="Enter Address"
          type="test"
          {...register("address", { required: "Address is required!" })}
        />
        {errors.address && <p> {errors.address.message}</p>}


        <div className="form_buttons">
          <input type="submit" value="SignUp" />
        </div>
        
      </form>
    </div>
  )
}

export default SignUp