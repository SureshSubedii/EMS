import { RemoveRedEyeRounded, VisibilityOff } from "@mui/icons-material";
import axios from "../axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AdminLog, SignUpButton, login, setSuperAdmin } from "../stateManagement/userSlice";

import { toast } from "react-toastify";
import "../styles/login.css";
import Spinner from "./Spinner";

function LogIn() {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
  } = useForm();

  const onLogin = async (data) => {
    console.log(data)
    try {
      setLoading(true);
      const response = await axios.post(
        "user/userLogin",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const fetchedResults = response.data;
      sessionStorage.setItem("username", fetchedResults.user);
      sessionStorage.setItem("userId", fetchedResults.userId);
      if (fetchedResults.error) {
        toast.error(fetchedResults.error);
      } else if (fetchedResults.token) {
        sessionStorage.setItem("authToken", fetchedResults.token);
        dispatch(login(sessionStorage.getItem("authToken")));
      }
      if (fetchedResults.admin) {
        sessionStorage.setItem("admin", true);
        dispatch(AdminLog());
      }
      if (fetchedResults.superAdmin){
        sessionStorage.setItem("superAdmin", true);
        dispatch(setSuperAdmin())

      }
     
     
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onLogin)}>
      <div className="email">
        <input
          name="email"
          className="credential"
          placeholder="Enter Email"
          type="email"
          {...register("email")}
          required

        />
      </div>
        <div className="password" style={{"position":"relative"}}>
        <input
          name="password"
          className="credential"
          placeholder="Enter Password"
          type={clicked ? "text" : "password"}
          {...register("password")}
          required
        />
        {!clicked ? (
          <VisibilityOff
            onClick={() => setClicked(!clicked)}
            className="showHideIcon"
          />
        ) : (
          <RemoveRedEyeRounded
            className="showHideIcon"
            onClick={() => setClicked(!clicked)}
          />
        )}

        </div>

        <div className="form_buttons">
          <input type="submit" value="Login" />
          <h2  >Not a member? Click on <u onClick={() => dispatch(SignUpButton())}>   SignUp</u></h2>
        </div>
      </form>
      {loading && (
        <div className="loader">
          <Spinner />
          please wait...
        </div>
      )}
    </div>
  );
}

export default LogIn;
