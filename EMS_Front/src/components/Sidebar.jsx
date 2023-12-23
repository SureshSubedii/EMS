import { AddToPhotos, Menu } from '@mui/icons-material'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import DeckOutlinedIcon from '@mui/icons-material/DeckOutlined'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Avatar, IconButton } from '@mui/material'
import axios from '../axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminCheck, cartCheck, checkUser } from '../stateManagement/userSlice'
import '../styles/sidebar.css'

function Sidebar () {
  const admin = useSelector(adminCheck)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [cartLength, setCartLength] = useState(0)
  const [path, setPath] = useState('')
  const user = useSelector(checkUser)

  const cart = useSelector(cartCheck)

  const toggle = cpath => {
    sessionStorage.setItem('item', cpath)
    setPath(cpath)
    navigate(`/${cpath}`)
  }

  const findCartLength = async () => {
    axios
      .get(`product/showCart/${sessionStorage.getItem('userId')}`, {
        headers: {
          Authorization: user
        }
      })
      .then(res => {
        setUsername(sessionStorage.getItem('uploader'))

        setCartLength(res.data.length)
      })
  }
  const handleHide = () => {
    document.querySelector('.sidebar').classList.add('hide')
    document.querySelector('.home_menu').classList.remove('hide')
  }

  useEffect(() => {
    findCartLength()
  }, [cart])

  useEffect(() => {
    const item = sessionStorage.getItem('item')
    console.log(item)

    const selectedElement = document.querySelector('.selected')
    if (selectedElement) {
      selectedElement.classList.remove('selected')
    }

    if (!path && !item) {
      document.getElementById('products').classList.add('selected')
    } else document.getElementById(path || item).classList.add('selected')
  }, [path])

  useEffect(() => {
    const element = document.querySelector(
      '.sidebar .sidebar_items:nth-child(4)'
    )
    element.style.setProperty('--noOfCartProducts', `'${cartLength}'`)
  }, [cartLength])

  return (
    <div className='sidebar'>
      <div className='user'>
        <h1 className='username'>
          <Avatar className='avtr' />

          {username}
          {admin && ' (Admin)'}
        </h1>

        <IconButton className='menu' onClick={() => handleHide()}>
          <Menu />
        </IconButton>
      </div>

      <p className='sidebar_items ' id='products' onClick={() => toggle('')}>
        <DeckOutlinedIcon />
        Products
      </p>

      <p
        className='sidebar_items'
        id='category'
        onClick={() => toggle('category', 1)}
      >
        <CategoryOutlinedIcon />
        Category &gt;
      </p>

      <p className='sidebar_items' id='cart' onClick={() => toggle('cart')}>
        <ShoppingCartOutlinedIcon />
        Cart
      </p>

      {admin && (
        <>
          <p
            className='sidebar_items'
            id='addProduct'
            onClick={() => toggle('addProduct')}
          >
            <AddToPhotos />
            Add Products
          </p>
          <p
            className='sidebar_items'
            id='userManagement'
            onClick={() => toggle('userManagement')}
          >
            <ManageAccountsIcon />
            User Management
          </p>
        </>
      )}
    </div>
  )
}

export default Sidebar
