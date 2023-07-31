import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminCheck } from '../stateManagement/userSlice'
import '../styles/appcontents.css'
import AddProducts from './AddProducts'
import Cart from './Cart'
import Category from './Category'
import ManageProducts from './ManageProducts'
import Products from './Products'
import ProductsDetails from './ProductsDetails'
import UserManagement from './UsersManagement'



function Appcontents() {
  const admin=useSelector(adminCheck);
  const location=useLocation();
  const [products, setProducts] = useState([])
  const [loading,setLoading]=useState(false)

  const getProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://192.168.18.177:5000/api/v1/product/getAllProducts');
      setProducts(response.data)
      setLoading(false)

    } catch (err) {
      setLoading(false)

      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error)

        
      } else {
        toast.error(err.message);
      }
    }

    }
  

  useEffect(() => {
    getProducts()

  
  }, [])
  
  return (
    <>
    
    <div className='appcontents'>
 


         <Routes>
         <Route path="/" element={<Products loading={loading} products={products}/>}/>
        <Route  path="/addProduct" element={<AddProducts/>}/>
        {admin && <Route  path="/userManagement" element={<UserManagement/>}/>}
        <Route  path="/cart" element={<Cart/>}/>
        <Route  path="/category" element={<Category  loading={loading} products={products}/>} />
        <Route path='productDetails' element={<ProductsDetails/>}/>
        <Route path='manageProducts' element={<ManageProducts  loading={loading} products={products}/>}/>




          
            </Routes>
    </div>
    </>

  )
}

export default Appcontents