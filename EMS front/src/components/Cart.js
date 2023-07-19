import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/cart.css';

function Cart() {
  const [products, setProducts] = useState([]);
  const [counts, setCounts] = useState([]);

  const decreaseCount = (index) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] = newCounts[index] === 0 ? 0 : newCounts[index] - 1;
      return newCounts;
    });
  };

  const increaseCount = (index) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] = newCounts[index] + 1;
      return newCounts;
    });
  };

  const getProducts = async () => {
    try {
      const response = await axios.get('http://192.168.18.177:5000/api/v1/product/getAllProducts');
      setProducts(response.data);
      setCounts(new Array(response.data.length).fill(0));
      console.log(counts)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className='cart'>
        {products?.map((product, index) => {
          return (
            <div className="cart_items" key={product._id}>
              <img src={`http://192.168.18.177:5000/api/v1/product/getProductPhoto/${product._id}`} alt={product.name} />
              <div className="product_details">
                <h2>{product.name.slice(0, 15)} {product.name[15] ? "..." : ""}</h2>
                <h3>Rs.{product.price}</h3>
                <div className="count">
                  <button onClick={() => decreaseCount(index)}>-</button>
                  {counts[index]}
                  <button onClick={() => increaseCount(index)}>+</button>
                </div>
                <button className="buy">Buy</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Cart;
