import React, { useState } from 'react';
import '../styles/category.css';
import Spinner from './Spinner';

function Category({ products, loading }) {
  const [categoryOption,setCategoryOption]=useState();
 
  return (
    <>
    <h1 className="category_header" align="center">
      CATEGORIES
    {  loading && 
            <Spinner />
          }
      </h1>
      <h2 align="center">
        Choose a category:
        <select onChange={(e)=>setCategoryOption(e.target.value)}>
          <option value="clothing" >Clothing</option>
          <option value="others">Others</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
        </select>
      </h2>

      
      <div className="category">

      

               {/* <> */}
                {products?.map((prod) => (
                  prod.category===categoryOption?
                 ( <div className="category_items">
                    <img src={`http://192.168.18.177:5000/api/v1/product/getProductPhoto/${prod._id}`} alt={prod.name} />
                    <h2>{prod.name.slice(0, 15)} {prod.name[15] ? "..." : ""}</h2>
                    <h3>Rs.{prod.price}</h3>
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