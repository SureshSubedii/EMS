import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/cart.css';
import Spinner from './Spinner';

function Cart() {
  const [products, setProducts] = useState([]);
  const [counts, setCounts] = useState([]);
  const [loading,setLoading]=useState(true);


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

  const getCart = async () => {
    try {
      setLoading(true)

      const response = await axios.get(`http://192.168.18.177:5000/api/v1/product/showCart/${sessionStorage.getItem("userId")}`);
      setProducts(response.data);
      setCounts(new Array(response.data.length).fill(0));
      setLoading(false)
    } catch (error) {
      setLoading(true)
      alert("Error")

      console.error('Error fetching cart:', error);
      setLoading(false)

    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
    <h1 align="center">YOUR CART</h1>
    {products.length===0 && 
    <h2 align="center">CART is Empty!</h2>
        
        }
         {loading && <div className="loader">
    <Spinner/>
    please wait...

    </div> }



      <div className='cart'>
        {products?.map((product, index) => {
          return (
            <div className="cart_items" key={product.pid}>
              <img src={`http://192.168.18.177:5000/api/v1/product/getProductPhoto/${product.pid}`} alt={product.name} />
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
