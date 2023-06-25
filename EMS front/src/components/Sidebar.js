import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminCheck } from '../stateManagement/userSlice'
import '../styles/sidebar.css'

function Sidebar() {
  const admin=useSelector(adminCheck)
  const navigate=useNavigate();
  return (
    <> 
    <div className="sidebar">
      <div className="user">
        <Avatar className='avatar'/>
      <h1 className='username'>Suresh Subedi</h1>

      </div>
            <p className='sidebar_items'>Products</p>
            <p className='sidebar_items' onClick={()=>navigate("/addProduct")}>Add Products</p>
            <p className="sidebar_items">Category</p>
            <p className='sidebar_items'>Cart</p>

            {admin &&<p className='sidebar_items'>User Management</p>}


    </div>
            <div className="line"></div>
            </>

  )
}

export default Sidebar