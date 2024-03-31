import { createSlice } from '@reduxjs/toolkit';



export const userSlice = createSlice({
  name: 'user',
  initialState:{
  value:null,
  signUpClicked: Boolean(false),
  admin:Boolean(false),
  cart:1,
  socket: null

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

    },
    AdminLogOut:(state)=>{
      state.admin=false;

    },
    AddCart:(state)=>{
      state.cart+=1
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
      }
    }


  }})



export  const {login,logout,SignUpNot,SignUpButton,AdminLog,AdminLogOut,AddCart,setSocket,
  disconnectSocket}=userSlice.actions
export const checkUser=(state) => state.user.value;
export const checkSignUpButton=(state)=>state.user.signUpClicked;
export const adminCheck=(state)=>state.user.admin;
export const cartCheck=(state)=>state.user.cart;
export const checkSocket = (state) => state.user.socket; // Add selector for socket state


export default userSlice.reducer
