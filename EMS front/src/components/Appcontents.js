import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { adminCheck } from '../stateManagement/userSlice'
import '../styles/appcontents.css'
import AddProducts from './AddProducts'
import Cart from './Cart'
import Category from './Category'
import Products from './Products'
import UserManagement from './UsersManagement'

function Appcontents() {
  const admin=useSelector(adminCheck);
  return (
    <>
    
    <div className='appcontents'>
    <div className="line"></div>


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