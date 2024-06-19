import { RemoveRedEyeRounded, VisibilityOff } from "@mui/icons-material";
import axios from "../axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AdminLog, SignUpNot, login } from "../stateManagement/userSlice";
import "../styles/signUp.css";
import Spinner from "./Spinner";

function SignUp() {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSignUp = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "user/userSignup",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        }
      );

      const fetchedResults = response.data;
      if (fetchedResults.success) {
        toast.success(fetchedResults.success);
      }
      // else if (fetchedResults?.token) {
      sessionStorage.setItem("authToken", fetchedResults.token);
      dispatch(login(sessionStorage.getItem("authToken")));
      // }
      sessionStorage.setItem("username", fetchedResults.user);
      sessionStorage.setItem("userId", fetchedResults.userId);
      if (fetchedResults.admin) {
        sessionStorage.setItem("admin", true);
        dispatch(AdminLog());
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="signUp">
      <h2>
        <p id="back" onClick={()=> dispatch(SignUpNot())}> &larr;</p>

        <span> Register to EMS</span>
      </h2>
     
      <form onSubmit={handleSubmit(onSignUp)}>
        <input
          name="email"
          className="credential"
          placeholder="Enter Email"
          type="email"
          {...register("email")}
          required
        />
        <input
          name="name"
          className="credential"
          placeholder="Enter full name"
          type="text"
          {...register("name")}
          required
        />

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
        <input
          name="contact"
          className="credential"
          placeholder="Enter contact number"
          type="number"
          {...register("contact")}
          required
        />

        <input
          name="address"
          className="credential"
          placeholder="Enter Address"
          type="text"
          {...register("address")}
          required
        />
        <div className="userType">
          <p>Select User Type</p>
          <label htmlFor="seller">Seller </label> 
           <input
           type="radio"
           value="1"
           id="seller"
          name="userType"
          {...register("userType")}
          required
        />
        <label htmlFor="seller">Buyer </label> 
        <input
           type="radio"
           value="0"
          name="userType"
          id="buyer"
          {...register("userType")}
          required
        />
        </div>
        

        <div className="form_buttons">
          <input type="submit" value="SignUp" />
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

export default SignUp;
