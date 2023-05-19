import React from 'react'
import '../styles/login.css'

function LogIn() {
  return (
    <div className="login">
        <h2>Login</h2>
        <form>
        <input  className="credential" placeholder="Enter Email" type="email"/>
        <input className="credential" placeholder="Enter Password" type='password'/>
        <div className="form_buttons">
           <input type="submit" value="Login"/>
           <h2 htmlFor="signUp">Not a member? Click on SignUp</h2>
           <input id="signUp" type="submit" value="SignUp"/>



        </div>

        </form>
        
    </div>
  )
}

export default LogIn