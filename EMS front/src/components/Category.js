import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/category.css';
import Spinner from './Spinner';

function Category({ products, loading }) {
  const [categoryOption,setCategoryOption]=useState('clothing');
  const navigate=useNavigate();
  const handleClick=(productDetails)=>{
    sessionStorage.removeItem('productDetails');
    console.log( sessionStorage.getItem('productDetails'))
    let productDetailsStringified=JSON.stringify(productDetails)
    sessionStorage.setItem('productDetails',productDetailsStringified)
    navigate("/productDetails")
  }
 
  return (
    <>
    <h1 className="category_header" align="center">
      CATEGORIES
      {loading && <div className="loader">
        <Spinner />
        please wait...

      </div>}
      
      </h1>
     {!loading && <h2 align="center">
        Choose a category:
        <select onChange={(e)=>setCategoryOption(e.target.value)}>
          <option value="clothing" >Clothing</option>
          <option value="others">Others</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
        </select>
      </h2>}

      
      <div className="category">

      

               {/* <> */}
                {products?.map((prod) => (
                  prod.category===categoryOption?
                 ( <div className="category_items" key={prod._id} onClick={()=>handleClick(prod)}>
                    <img src={`http://localhost:5000/api/v1/product/getProductPhoto/${prod._id}`} alt={prod.name} />
                   <div>
                   <h2>{prod.name.slice(0, 15)} {prod.name[15] ? "..." : ""}</h2>
                    <p color='red'>Rs.{prod.price}</p>
                     </div> 
                    
                  </div>):
                  ''

                  // (<div className="not_found">
                  //   Items not found
                  // </div>
                  //   )

                ))}
             
               {/* </> */}
              




        </div>
      </>
  )
}

export default Category