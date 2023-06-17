import { createSlice } from '@reduxjs/toolkit';



export const userSlice = createSlice({
  name: 'user',
  initialState:{
  value:null,
  signUpClicked: false,
  admin:false

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


    },
    AdminLog:(state)=>{
      state.admin=true;

    }


  }})



export  const {login,logout,SignUpNot,SignUpButton,AdminLog}=userSlice.actions
export const checkUser=(state) => state.user.value;
export const checkSignUpButton=(state)=>state.user.signUpClicked;
export const adminCheck=(state)=>state.user.admin;
export default userSlice.reducer
