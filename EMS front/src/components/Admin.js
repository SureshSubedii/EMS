import { RemoveRedEyeRounded, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AdminLog, login } from '../stateManagement/userSlice';
import '../styles/admin.css';

function Admin() {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = async (data) => {
    try {
      const response = await axios.post('http://192.168.18.177:5000/loginAdmin', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const fetchedResults = response.data;
      if (fetchedResults?.error) {
        alert(fetchedResults.error);
      } else if (fetchedResults?.token) {
        sessionStorage.setItem('authToken', fetchedResults.token);
        sessionStorage.setItem('admin', true);
        dispatch(AdminLog());
        dispatch(login(sessionStorage.getItem('authToken')));
        navigate('/');
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className='admin'>
      <h2>Admin</h2>
      <form onSubmit={handleSubmit(onLogin)}>
        <input
          name='email'
          className='credential'
          placeholder='Enter Email'
          type='email'
          {...register('email', { required: 'Email is required!' })}
        />
        {errors.email && <p> {errors.email.message}</p>}
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

        {errors.password && <p> {errors.password.message}</p>}
        <div className='form_buttons'>
          <input type='submit' value='Login' />
        </div>
      </form>
    </div>
  );
}

export default Admin;
