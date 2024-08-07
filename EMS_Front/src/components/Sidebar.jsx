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
import {
  adminCheck,
  cartCheck,
  checkUser,
  superAdmin
} from '../stateManagement/userSlice'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import '../styles/sidebar.css'
import CircleIcon from '@mui/icons-material/Circle'

function Sidebar () {
  const admin = useSelector(adminCheck)
  const superAdmn = useSelector(superAdmin)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [cartLength, setCartLength] = useState(0)
  const [path, setPath] = useState('')
  const user = useSelector(checkUser)
  const [role, setRole] = useState({ role: 'User', color: 'green' })

  const cart = useSelector(cartCheck)

  const toggle = cpath => {
    sessionStorage.setItem('item', cpath)
    setPath(cpath)
    navigate(`/${cpath}`)
  }

  const findCartLength = async () => {
    setUsername(sessionStorage.getItem('username'))

    axios
      .get(`product/showCart/${sessionStorage.getItem('userId')}`, {
        headers: {
          Authorization: `Bearer ${user}`
        }
      })
      .then(res => {
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
    setRole(
      admin
        ? { color: 'rgb(41 62 205)', role: 'Vendor' }
        : superAdmn
        ? { color: 'red', role: 'Super Admin' }
        : role
    )
  }, [admin, superAdmn])

  useEffect(() => {
    const item = sessionStorage.getItem('item')

    const selectedElement = document.querySelector('.selected')
    if (selectedElement) {
      selectedElement.classList.remove('selected')
    }

    if (!path && !item) {
      document.getElementById('products').classList.add('selected')
    } else document.getElementById(path || item).classList.add('selected')
  }, [path])

  useEffect(() => {
    if (!admin && !superAdmn) {
      const element = document.querySelector(
        '.sidebar .sidebar_items:nth-child(5)'
      )
      element.style.setProperty('--noOfCartProducts', `'${cartLength}'`)
    }
  }, [cartLength])

  return (
    <div className='sidebar'>
      <div className='user'>
        <h1 className='username'>
          <Avatar className='avtr' />

          {username}
        </h1>

        <IconButton className='menu' onClick={() => handleHide()}>
          <Menu />
        </IconButton>
      </div>
      <h3 id='role'>
        {' '}
        <CircleIcon style={{ color: role.color }}></CircleIcon> {role.role}{' '}
      </h3>

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

      {!admin && !superAdmn && (
        <p className='sidebar_items' id='cart' onClick={() => toggle('cart')}>
          <ShoppingCartOutlinedIcon />
          Cart
        </p>
      )}
      <p className='sidebar_items' id='orders' onClick={() => toggle('orders')}>
        <ChecklistOutlinedIcon />
        Orders
      </p>

      {(admin || superAdmn) && (
        <p
          className='sidebar_items'
          id='addProduct'
          onClick={() => toggle('addProduct')}
        >
          <AddToPhotos />
          Add Products
        </p>
      )}
      {superAdmn && (
        <p
          className='sidebar_items'
          id='userManagement'
          onClick={() => toggle('userManagement')}
        >
          <ManageAccountsIcon />
          User Management
        </p>
      )}
    </div>
  )
}

export default Sidebar
