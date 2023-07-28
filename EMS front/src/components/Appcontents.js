import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import { adminCheck } from '../stateManagement/userSlice'
import '../styles/appcontents.css'
import AddProducts from './AddProducts'
import Cart from './Cart'
import Category from './Category'
import Products from './Products'
import UserManagement from './UsersManagement'



function Appcontents() {
  const admin=useSelector(adminCheck);
  const location=useLocation();

  useEffect(() => {
    console.log(location.pathname)

  
  }, [location.pathname])
  
  return (
    <>
    
    <div className='appcontents'>
 


         <Routes>
         <Route path="/" element={<Products/>}/>
        <Route  path="/addProduct" element={<AddProducts/>}/>
        {admin && <Route  path="/userManagement" element={<UserManagement/>}/>}
        <Route  path="/cart" element={<Cart/>}/>
        <Route  path="/category" element={<Category/>}/>



          
            </Routes>
    </div>
    </>

  )
}

export default Appcontents