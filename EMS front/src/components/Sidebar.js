import { AddToPhotos } from '@mui/icons-material'
import AlignHorizontalCenterOutlinedIcon from '@mui/icons-material/AlignHorizontalCenterOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import DeckOutlinedIcon from '@mui/icons-material/DeckOutlined'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminCheck } from '../stateManagement/userSlice'
import '../styles/sidebar.css'

function Sidebar() {
  const admin=useSelector(adminCheck)
  const navigate=useNavigate();

  const toggle=(cpath,i)=>{
    const selectedElement = document.querySelector('.selected');

    if (selectedElement) {
      selectedElement.classList.toggle("selected");
    }
    
    const sidebarItems = document.querySelectorAll('.sidebar_items');

sidebarItems.forEach((item,index )=> {
  if(index===i){
  item.classList.add("selected");

  
  navigate(`/${cpath}`);



  }

});

    

  }
  const [username,setUsername]=useState('');
  useEffect(() => {
    setUsername(sessionStorage.getItem('uploader'))
    
  
 
  }, [])
  
  
  return (
    <div className="sidebar">
      <div className="user">
        <Avatar className='avatar'/>
      <h1 className='username'>{username}
      {admin && <p>(Admin)</p>}
      
      </h1>


      </div>
            <p className='sidebar_items' onClick={()=>toggle("",0)}>
              <DeckOutlinedIcon/>
              Products</p>
            <p className='sidebar_items' onClick={()=>toggle("addProduct",1)}>
              <AddToPhotos/>
              Add Products</p>
            <p className="sidebar_items" onClick={()=>toggle("yourProducts",2)}>
              <AlignHorizontalCenterOutlinedIcon/>
              Your Products</p>
            <p className="sidebar_items" onClick={()=>toggle("category",3)}>
              <CategoryOutlinedIcon/>
              Category</p>
            <p className='sidebar_items' onClick={()=>toggle("cart",4)}>
              <ShoppingCartOutlinedIcon/>
              Cart</p>

            {admin &&<p className='sidebar_items' onClick={()=>toggle("userManagement",5)}>
              <ManageAccountsIcon/>
              User Management</p>}



    </div>


  )
}

export default Sidebar