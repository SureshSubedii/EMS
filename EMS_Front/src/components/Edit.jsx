import React, { useEffect } from 'react'
import '../styles/edit.css'
import axios from "../axios";

function Edit({setEdit, product}) {
  const handleClose =(e)=> {
    e.stopPropagation()
    setEdit(0)

  }
  const handleClick =(e)=> {
    e.stopPropagation()

  }
  
  useEffect(() => {
    console.log(product)
  
   
  }, [])
  
  return (
    
    <div id="edit" onClick={(e)=> handleClose(e)}>

      <form className="edit-form" onClick={(e)=> handleClick(e)}>
        <h1>Edit Form</h1>
        <input type="text"  value ={product.name}  placeholder='Enter Name'/>
        <input type="text"  value ={product.description}  placeholder='Enter Description'/>
        <input type="number"  value ={product.price}  placeholder='Enter Price'/>
        <select name="category" defaultValue= {product.category} id="">
          <option value="furniture">Furniture</option>
          <option value="others">Others</option>
          <option value="utensils">Utensils</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">electronics</option>
        </select>
        <div className="action">
        <input type="submit" id="submit" value = "Update"/>

        </div>



      </form>
      
      </div>
  )
}

export default Edit