import { RemoveRedEyeRounded, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { SignUpButton, login } from '../stateManagement/userSlice';
import '../styles/login.css';

function LogIn() {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = async (data) => {
    try {
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
      sessionStorage.setItem('uploader', fetchedResults.uploader);
      sessionStorage.setItem('userId', fetchedResults.userId);


    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div className='login'>
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
    </div>
  );
}

export default LogIn;
