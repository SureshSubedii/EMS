import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/products.css';

function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/product/getAllProducts');
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
            <h3>{product.name}</h3>
            <img src={`http://localhost:5000/api/v1/product/getProductPhoto/${product._id}`} alt={product.name} />
          </div>
        );
      })}
    </div>
  );
}

export default Products;
