import { RemoveRedEyeRounded, VisibilityOff } from "@mui/icons-material";
import axios from "../axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SignUpNot, login } from "../stateManagement/userSlice";
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
      console.log(fetchedResults.success);
      if (fetchedResults.success) {
        toast.success(fetchedResults.success);
      }
      // else if (fetchedResults?.token) {
      sessionStorage.setItem("authToken", fetchedResults.token);
      dispatch(login(sessionStorage.getItem("authToken")));
      // }
      sessionStorage.setItem("uploader", fetchedResults.uploader);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err);
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
          {...register("email", { required: "Email is required!" })}
        />
        <input
          name="name"
          className="credential"
          placeholder="Enter full name"
          type="text"
          {...register("name", { required: "Name is required!" })}
        />

        <input
          name="password"
          className="credential"
          placeholder="Enter Password"
          type={clicked ? "text" : "password"}
          {...register("password", { required: "Password is required!" })}

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
          {...register("contact", { required: "Contact is required!" })}
        />

        <input
          name="address"
          className="credential"
          placeholder="Enter Address"
          type="text"
          {...register("address", { required: "Address is required!" })}
        />

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
