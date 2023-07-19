import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/cart.css';

function Cart() {
    const [products, setProducts] = useState([]);
    const [count,setCount]=useState(0)

    const decreaseCount=()=>{
        setCount((prev)=>prev==0?prev:prev-1)

    }

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
        <>

      <div className='cart'>
            

        {products?.map((product) => {
          return (
             
            <div className="cart_items" key={product._id}>

              <img src={`http://192.168.18.177:5000/api/v1/product/getProductPhoto/${product._id}`} alt={product.name} />
              <div className="product_details">
              <h2>{product.name.slice(0,15)} {product.name[15]?"...":""}</h2>
              <h3>Rs.{product.price}</h3>
             
              <div className="count">
              <button onClick={decreaseCount}>-</button>
              {count}
              <button onClick={()=>setCount((prev)=>prev+1)}>+</button>

                </div>
                <button className="buy">buy</button>
              </div>
           
           
            </div>
          );
        })}
      </div>
      </>

    );
}

export default Cart