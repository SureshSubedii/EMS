import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/products.css';

function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get('http://192.168.18.177:5000/api/v1/product/getAllProducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const handleAddToCart= async(name,price,description,pid,category)=>{
    

const userId=sessionStorage.getItem("userId")
    // console.log(name,price,description,id)
    try {
      const formData = new FormData();
    formData.append('name',name)
    formData.append('price',price)
    formData.append('description',description)
    formData.append('userId',userId)
    formData.append('pid',pid)
    formData.append('category',category)



      const response = await axios.post('http://192.168.18.177:5000/api/v1/product/addToCart',formData,
      {
        headers:{
          'Content-Type': 'application/json',
      }
      })
      const fetchedResults = response.data; 
      alert(fetchedResults.success)

      
    } catch (err) {
      console.log('Error fetching products:', err);
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert(err.message);
      }
    }
  }


  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
        <h1 align="center">PRODUCTS</h1>

    <div className='products'>
      {products?.map((product) => {
        return (
          <div className="items" key={product._id}>
            <img src={`http://192.168.18.177:5000/api/v1/product/getProductPhoto/${product._id}`} alt={product.name} />
            <div className="product_details">
            <h2>{product.name.slice(0,15)} {product.name[15]?"...":""}</h2>
            <h3>Rs.{product.price}</h3>
            <button onClick={()=>handleAddToCart(product.name,product.price,product.description,product._id,product.category)}>Add to cart</button>
            </div>
          
         
          </div>
        );
      })}
    </div>
    </>

  );
}

export default Products;
