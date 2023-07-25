import { RemoveRedEyeRounded, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AdminLog, SignUpButton, login } from '../stateManagement/userSlice';

import '../styles/login.css';
import Spinner from './Spinner';

function LogIn() {
  const [clicked, setClicked] = useState(false);
  const [loading,setLoading]=useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = async (data) => {
    try {
      setLoading(true)
      const response = await axios.post('http://192.168.18.177:5000/api/v1/user/userLogin', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const fetchedResults = response.data; 

      if (fetchedResults?.error) {
        alert(fetchedResults.error);
      } else if (fetchedResults?.token) {
        sessionStorage.setItem('authToken', fetchedResults.token);
        dispatch(login(sessionStorage.getItem('authToken')));
      }
      if(fetchedResults.admin){
        sessionStorage.setItem('admin', true);
      sessionStorage.setItem('uploader', fetchedResults.uploader);
        dispatch(AdminLog());
      }
      sessionStorage.setItem('uploader', fetchedResults.uploader);
      sessionStorage.setItem('userId', fetchedResults.userId);
      setLoading(false)



    } catch (err) {
      setLoading(true)

      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert(err.message);
      }
      setLoading(false)

    }
  };

  return (
    <div className='login'>
      {console.log(sessionStorage.getItem("uploader"))}
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onLogin)}>
        <input
          name='email'
          className='credential'
          placeholder='Enter Email'
          type='email'
          {...register('email', { required: 'Email is required!' })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          name='password'
          className='credential'
          placeholder='Enter Password'
          type={clicked ? 'text' : 'password'}
          {...register('password', { required: 'Password is required!' })}
        />
        {!clicked ? (
          <VisibilityOff onClick={() => setClicked(!clicked)} className='showHideIcon' />
        ) : (
          <RemoveRedEyeRounded className='showHideIcon' onClick={() => setClicked(!clicked)} />
        )}

        {errors.password && <p>{errors.password.message}</p>}
        <div className='form_buttons'>
          <input type='submit' value='Login' />
          <h2 htmlFor='signUp'>Not a member? Click on SignUp</h2>
          <input id='signUp' onClick={() => dispatch(SignUpButton())} type='button' value='SignUp' />
        </div>
      </form>
      {loading && <div className="loader">
    <Spinner/>
    please wait...

    </div>}
    </div>
  );
}

export default LogIn;
