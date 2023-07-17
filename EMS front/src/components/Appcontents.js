import React from 'react'
import { Route, Routes } from 'react-router-dom'
import '../styles/appcontents.css'
import AddProducts from './AddProducts'
import Products from './Products'
import UserManagement from './UsersManagement'

function Appcontents() {
  return (
    <>
    
    <div className='appcontents'>
    <div className="line"></div>


         <Routes>
         <Route path="/*" element={<Products/>}/>
        <Route  path="/addProduct" element={<AddProducts/>}/>
        <Route  path="/userManagement" element={<UserManagement/>}/>
        <Route  path="/cart" element={<AddProducts/>}/>

        <Route  path="/yourproducts" element={<UserManagement/>}/>

          
            </Routes>
    </div>
    </>

  )
}

export default Appcontents