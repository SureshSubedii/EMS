import React from "react";
import "../styles/login.css";
import { useForm } from "react-hook-form";

function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => { 
    console.log(data.email,data.password)
  };
  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          className="credential2"
          placeholder="Enter Password"
          type="password"
          {...register("password", { required: "Password is required!" })}
        />
        {errors.password && <p> {errors.password.message}</p>}
        <div className="form_buttons">
          <input type="submit" value="Login" />
          <h2 htmlFor="signUp">Not a member? Click on SignUp</h2>
          <input id="signUp" type="submit" value="SignUp" />
        </div>
        ``
      </form>
    </div>
  );
}

export default LogIn;
