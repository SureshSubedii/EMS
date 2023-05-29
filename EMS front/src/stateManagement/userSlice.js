import {createSlice } from '@reduxjs/toolkit';



export const userSlice = createSlice({
  name: 'user',
  initialState:{
  value:null

  },
  reducers: {
    login: (state,actions) => {
      state.value =actions.payload ;
    },
    logout: (state) => {
      state.value =null;
    },
  }})



export  const {login,logout}=userSlice.actions
export const checkUser=(state) => state.user.value;
export default userSlice.reducer
