import { AddToPhotos } from '@mui/icons-material'
import AlignHorizontalCenterOutlinedIcon from '@mui/icons-material/AlignHorizontalCenterOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import DeckOutlinedIcon from '@mui/icons-material/DeckOutlined'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Avatar } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminCheck, cartCheck } from '../stateManagement/userSlice'
import '../styles/sidebar.css'

function Sidebar() {
  const admin = useSelector(adminCheck)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [cartLength, setCartLength] = useState(0)

  const cart=useSelector(cartCheck);

  const toggle = (cpath, i) => {
    const selectedElement = document.querySelector('.selected')
    sessionStorage.setItem('selectedItemIndex', i)
    if (selectedElement) {
      selectedElement.classList.remove('selected')
    }
    document.querySelectorAll('.sidebar_items')[i]?.classList.add('selected')
    navigate(`/${cpath}`)
  }
const findCartLength=async()=>{
  setTimeout(async()=>{
     setUsername(sessionStorage.getItem('uploader'))
   const res= await axios.get(`http://192.168.18.177:5000/api/v1/product/showCart/${sessionStorage.getItem('userId')}`)
   setCartLength(res.data.length)
  },0)

    

}
  useEffect( () => {
    findCartLength();
  }, [cart])
  useEffect(() => {
    const storedIndex = sessionStorage.getItem('selectedItemIndex')

    document.querySelectorAll('.sidebar_items')[storedIndex]?.classList.add('selected')
    
  const element = document.querySelector('.sidebar .sidebar_items:nth-child(6)');
element.style.setProperty('--noOfCartProducts', `'${cartLength}'`);
    console.log(cartLength);
  }, [cartLength]);

  return (
    <div className='sidebar'>
      <div className='user'>
        <Avatar className='avatar' />
        <h1 className='username'>
          {username}

          {admin && <p>(Admin)</p>}
        </h1>
      </div>
      <p className='sidebar_items ' onClick={() => toggle('', 0)}>
        <DeckOutlinedIcon />
        Products
      </p>
      <p className='sidebar_items' onClick={() => toggle('addProduct', 1)}>
        <AddToPhotos />
        Add Products
      </p>
      <p className='sidebar_items' onClick={() => toggle('yourProducts', 2)}>
        <AlignHorizontalCenterOutlinedIcon />
        Your Products
      </p>
      <p className='sidebar_items' onClick={() => toggle('category', 3)}>
        <CategoryOutlinedIcon />
        Category
      </p>
      <p className='sidebar_items' onClick={() => toggle('cart', 4)}>
        <ShoppingCartOutlinedIcon />
        Cart
      </p>

      {admin && 
        <p
          className='sidebar_items'
          onClick={() => toggle('userManagement', 5)}
        >
          <ManageAccountsIcon />
          User Management
        </p>
      }
    </div>
  )
}

export default Sidebar
