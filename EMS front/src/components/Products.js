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
             <img src="https://images.pexels.com/photos/16952091/pexels-photo-16952091/free-photo-of-wood-landscape-field-summer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"alt={product.name} />
          </div>
        );
      })}
    </div>
  );
}

export default Products;
