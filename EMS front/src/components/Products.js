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
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='products'>
      {products?.map((product) => {
        return (
          <div className="items" key={product._id}>
            <img src={`http://192.168.18.177:5000/api/v1/product/getProductPhoto/${product._id}`} alt={product.name} />
            <div className="product_details">
            <h2>{product.name.slice(0,15)} {product.name[15]?"...":""}</h2>
            {/* <p>{product.description}</p> */}
            <h3>Rs.{product.price}</h3>
            <button>Add to cart</button>
            </div>
          
         
          </div>
        );
      })}
    </div>
  );
}

export default Products;
