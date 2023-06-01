import {createSlice } from '@reduxjs/toolkit';



export const userSlice = createSlice({
  name: 'user',
  initialState:{
  value:null,
  signUpClicked: false

  },
  reducers: {
    login: (state,action) => {
      state.value =action.payload ;
    },
    logout: (state) => {
      state.value =null;
    },
    SignUpButton:(state)=>{
      state.signUpClicked=true;

    },
    SignUpNot:(state)=>{
      state.signUpClicked=false;


    }


  }})



export  const {login,logout,SignUpNot,SignUpButton}=userSlice.actions
export const checkUser=(state) => state.user.value;
export const checkSignUpButton=(state)=>state.user.signUpClicked;
export default userSlice.reducer
