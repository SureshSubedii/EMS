import axios from "../axios";
import React, { useEffect, useRef, useState } from "react";
import "../styles/cart.css";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { checkUser } from "../stateManagement/userSlice";
import { toast } from "react-toastify";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./Checkout";

function Cart() {
  const [products, setProducts] = useState([]);
  const [counts, setCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCartLength, setTotalCartLength] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [transaction, setTransaction] = useState(null);

  const user = useSelector(checkUser)
  const orderButtonRef = useRef(null); // Create a ref for the order button

  const initialOptions = {
    "client-id": import.meta.env.VITE_REACT_APP_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };


  const removeCart = async(cartId, index)=>{
    try {
      
      const { data } = await axios.delete('product/cart', {
        data: {
            cartId: cartId
        },
        headers: {
            "Authorization": `Bearer ${user}`
        }
    });
    
    if(data.success){
      getCart()
      toast.success("Item removed from the Cart")
    }
    } catch (error) {
      toast.error(error.message)
      
    }


  }

  const decreaseCount = (index, price) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] = newCounts[index] === 0 ? 0 : newCounts[index] - 1;
      if (newCounts[index] === 0 ){
        products.splice(index, 1)
        newCounts.splice(index, 1)

      }
      return newCounts;
    });
    setTotalCartLength(() =>
      counts[index] === 0 ? totalCartLength : totalCartLength - 1
    );

    setTotalPrice(() =>
      counts[index] === 0 ? totalPrice : totalPrice - price
    );
  };

  const increaseCount = (index, price) => {
    setCounts((prevCounts) => {

      const newCounts = [...prevCounts];
      newCounts[index] = newCounts[index] + 1;
      if (newCounts[index] <=  products[index].stock){
        setTotalCartLength((prev) => prev + 1);
        setTotalPrice((prev) => prev + price);
        return newCounts;
      }

      toast.error("Stock Quantity Exceeded")
      return [...prevCounts]
    });
    
  };

  const order = async()=>{
  
    try {
      const {data} = await axios.post('order/add', {
        orders: products,
        counts: counts,
        transactionId: transaction
  
      },{
        headers: {
          "Authorization":`Bearer ${user}`,
          "Content-Type": "application/json",

        }
      })
      toast.success(data.message)
    } catch (error) {
    toast.error(error.message)

      
    }
 
  
  }

  const getCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `product/showCart/${sessionStorage.getItem(
          "userId"
        )}`,
        {
          headers: {
            "Authorization":`Bearer ${user}`
          }
        }
      );
      setProducts(response.data);
      setCounts(new Array(response.data.length).fill(1));
      setTotalCartLength(response.data.length);
      setTotalPrice(
        response.data.reduce((acc, current) => acc + current.price, 0)
      );

      setLoading(false);
    } catch (error) {
      setLoading(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <h1 align="center">YOUR CART</h1>
      {products.length === 0 && <h2 align="center">CART is Empty!</h2>}
      {loading && (
        <div className="loader">
          <Spinner />
          please wait...
        </div>
      )}

      <div className="cart_container">
        <div className="cart">
          {products?.map((product, index) => {
            return (
              <div className="cart_items" key={product.pid}>
                <img
                  src={`http://localhost:5000/api/v1/product/getProductPhoto/${product.pid}`}
                  alt={product.name}
                />
                <h2 className="cart_name">{product.name}</h2>
                <div className="count">
                  <button onClick={() => decreaseCount(index, product.price)}>
                    -
                  </button>
                  {counts[index]}
                  <button onClick={() => increaseCount(index, product.price)}>
                    +
                  </button>
                </div>

                <div className="cart_product_details">
                  <h3>Rs.{product.price}</h3>
                </div>
                <button class="remove_cart" onClick={ ()=>removeCart(product._id, index)}> Remove</button>
              </div>
            );
          })}
        </div>
        <div className="cart_right">
          Total Items = {totalCartLength} <br />
          Total =RS {totalPrice} <br />
          <h4>Payment Method</h4>
          <PayPalScriptProvider options={initialOptions}>
              <Checkout total={totalPrice} orderButton={orderButtonRef} setTransaction={setTransaction}/>
            </PayPalScriptProvider>

          <button id="order" ref={orderButtonRef} onClick={()=> order()} className="buy">Order</button>
        </div>
      </div>
    </>
  );
}
export default Cart;
