import { createSlice } from '@reduxjs/toolkit';



export const userSlice = createSlice({
  name: 'user',
  initialState:{
  value:null,
  signUpClicked: Boolean(false),
  admin:Boolean(false),
  superAdmin:Boolean(false),
  cart:1,
  socket: null,
  menu : null

  },
  reducers: {
    login: (state,action) => {
      state.value =action.payload ;
    },
    logout: (state) => {
      state.value =null;
      state.admin = Boolean(false)
      state.superAdmin = Boolean(false)
      state.signUpClicked= Boolean(false);


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
  
    AddCart:(state)=>{
      state.cart+=1
    },
    setSuperAdmin:(state)=>{
      state.superAdmin = Boolean(true)

    },
    // setSocket: (state, action) => {
    //   state.socket = action.payload;
    // },
    // disconnectSocket: (state) => {
    //   if (state.socket) {
    //     state.socket.disconnect();
    //     state.socket = null;
    //   }
    // },
    setMenu:(state, action) =>{
      state.menu = action.payload

    }
  }})



export  const {login,logout,SignUpNot,SignUpButton,AdminLog,AdminLogOut,AddCart, setMenu,setSuperAdmin
  }=userSlice.actions
export const checkUser=(state) => state.user.value;
export const checkSignUpButton=(state)=>state.user.signUpClicked;
export const adminCheck=(state)=>state.user.admin;
export const cartCheck=(state)=>state.user.cart;
// export const checkSocket = (state) => state.user.socket; 
export const menu = (state) => state.user.menu; 
export const superAdmin = (state) => state.user.superAdmin


export default userSlice.reducer
