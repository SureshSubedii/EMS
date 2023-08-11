import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/cart.css';
import Spinner from './Spinner';

function Cart() {
  const [products, setProducts] = useState([]);
  const [counts, setCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCartLength, setTotalCartLength] = useState(0);



  const decreaseCount = (index) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] = newCounts[index] === 0 ? 0 : newCounts[index] - 1;
      return newCounts;
    });
  };

  const increaseCount = (index, price) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] = newCounts[index] + 1;
      setTotalCartLength(totalCartLength+1)
      return newCounts;
    });
  };

  const getCart = async () => {
    try {
      setLoading(true)

      const response = await axios.get(`http://192.168.18.177:5000/api/v1/product/showCart/${sessionStorage.getItem("userId")}`);
      setProducts(response.data);
      setCounts(new Array(response.data.length).fill(1));
      setTotalCartLength(response.data.length)

      setLoading(false)
    } catch (error) {
      setLoading(true)
      alert("Error")

      console.error('Error fetching cart:', error);
      setLoading(false)

    }
  };

  useEffect(() => {
    // const noOfCartProducts = sessionStorage.getItem('total_cart_length');

      // setTotalCartLength(parseInt(noOfCartProducts));
    getCart();
  }, []);
  
  // useEffect(() => {
  //   console.log(totalCartLength);
  // }, [totalCartLength]);

  return (
    <>
      <h1 align="center">YOUR CART</h1>
      {products.length === 0 &&
        <h2 align="center">CART is Empty!</h2>

      }
      {loading && <div className="loader">
        <Spinner />
        please wait...

      </div>}


<div className="cart_container">
<div className='cart'>
        {products?.map((product, index) => {
          return (
            <div className="cart_items" key={product.pid} >
              <img src={`http://192.168.18.177:5000/api/v1/product/getProductPhoto/${product.pid}`} alt={product.name} />
              <h2 className='cart_name'>{product.name}</h2>
              <div className="count">
                <button onClick={() => decreaseCount(index, product.price)}>-</button>
                {counts[index]}
                <button onClick={() => increaseCount(index, product.price)}>+</button>
              </div>

              <div className="cart_product_details">
                <h3>Rs.{product.price}</h3>




                {counts[index] != 0
                }
              </div>
            </div>
          );
        })}
      

      </div>
      <div className="cart_right">
        Total Items =  {totalCartLength}

        </div>

</div>
     
    </>
  );
}
export default Cart;
