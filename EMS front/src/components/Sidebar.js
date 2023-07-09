import { AddToPhotos } from '@mui/icons-material'
import AlignHorizontalCenterOutlinedIcon from '@mui/icons-material/AlignHorizontalCenterOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import DeckOutlinedIcon from '@mui/icons-material/DeckOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminCheck } from '../stateManagement/userSlice'
import '../styles/sidebar.css'

function Sidebar() {
  const [username,setUsername]=useState('');
  useEffect(() => {
    setUsername(sessionStorage.getItem('uploader'))
    
  
 
  }, [])
  
  const admin=useSelector(adminCheck)
  const navigate=useNavigate();
  return (
    <> 
    <div className="sidebar">
      <div className="user">
        <Avatar className='avatar'/>
      <h1 className='username'>{username}
      {admin && <p>(Admin)</p>}
      
      </h1>


      </div>
            <p className='sidebar_items' onClick={()=>navigate("/")}>
              <DeckOutlinedIcon/>
              Products</p>
            <p className='sidebar_items' onClick={()=>navigate("/addProduct")}>
              <AddToPhotos/>
              Add Products</p>
            <p className="sidebar_items">
              <AlignHorizontalCenterOutlinedIcon/>
              Your Products</p>
            <p className="sidebar_items">
              <CategoryOutlinedIcon/>
              Category</p>
            <p className='sidebar_items'>
              <ShoppingCartOutlinedIcon/>
              Cart</p>

            {admin &&<p className='sidebar_items'>User Management</p>}



    </div>

            </>

  )
}

export default Sidebar