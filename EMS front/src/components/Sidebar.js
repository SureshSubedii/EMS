import { AddToPhotos, Menu } from '@mui/icons-material'
import AlignHorizontalCenterOutlinedIcon from '@mui/icons-material/AlignHorizontalCenterOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import DeckOutlinedIcon from '@mui/icons-material/DeckOutlined'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Avatar, IconButton } from '@mui/material'
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

  const cart = useSelector(cartCheck);

  const toggle = (cpath, i) => {
    const selectedElement = document.querySelector('.selected')
    sessionStorage.setItem('selectedItemIndex', i)
    if (selectedElement) {
      selectedElement.classList.remove('selected')
    }
    document.querySelectorAll('.sidebar_items')[i]?.classList.add('selected')
    navigate(`/${cpath}`)
  }
  const findCartLength = async () => {
    setTimeout(async () => {
      setUsername(sessionStorage.getItem('uploader'))
      const res = await axios.get(`http://192.168.18.177:5000/api/v1/product/showCart/${sessionStorage.getItem('userId')}`)
      setCartLength(res.data.length)
    }, 0)
  }
  const handleHide = () => {
    document.querySelector(".sidebar").classList.add("hide")
    document.querySelector(".home_menu").classList.remove("hide")



  }

  useEffect(() => {
    findCartLength();
  }, [cart])

  useEffect(() => {

    const storedIndex = sessionStorage.getItem('selectedItemIndex')

    document.querySelectorAll('.sidebar_items')[storedIndex]?.classList.add('selected')
    if(!storedIndex){
    document.querySelectorAll('.sidebar_items')[0]?.classList.add('selected')


    }

    const element = document.querySelector('.sidebar .sidebar_items:nth-child(5)');
    element.style.setProperty('--noOfCartProducts', `'${cartLength}'`);
    console.log(cartLength);
  }, [cartLength]);

  return (
    <div className='sidebar'>

      <div className='user' >
        
        <h1 className='username' >
        <Avatar className='avtr'/>

          {username}
          {admin && <p>(Admin)  </p>}

        </h1>

          <IconButton className='menu' onClick={() => handleHide()}>
            <Menu />
          </IconButton>
      </div>

      <p className='sidebar_items ' onClick={() => toggle('', 0)}>
        <DeckOutlinedIcon />
        Products
      </p>

      <p className='sidebar_items' onClick={() => toggle('addProduct', 1)}>
        <AddToPhotos />
        Add Products
      </p>

      <p className='sidebar_items' onClick={() => toggle('category', 2)}>
        <CategoryOutlinedIcon />
        Category &gt;
      </p>


      <p className='sidebar_items' onClick={() => toggle('cart', 3)}>
        <ShoppingCartOutlinedIcon />
        Cart
      </p>

      {admin &&
        <>
          <p className='sidebar_items' onClick={() => toggle('manageProducts', 4)}>
            <AlignHorizontalCenterOutlinedIcon />
            Manage Products
          </p>

          <p
            className='sidebar_items'
            onClick={() => toggle('userManagement', 5)}>
            <ManageAccountsIcon />
            User Management
          </p>
        </>
      }
    </div>
  )
}

export default Sidebar
