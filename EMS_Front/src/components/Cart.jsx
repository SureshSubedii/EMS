import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/cart.css";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

function Cart() {
  const [products, setProducts] = useState([]);
  const [counts, setCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCartLength, setTotalCartLength] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const decreaseCount = (index, price) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] = newCounts[index] === 0 ? 0 : newCounts[index] - 1;
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
      return newCounts;
    });
    setTotalCartLength((prev) => prev + 1);
    setTotalPrice((prev) => prev + price);
  };

  const getCart = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:5000/api/v1/product/showCart/${sessionStorage.getItem(
          "userId"
        )}`
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
      // toast.error("Cart is empty")
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
              </div>
            );
          })}
        </div>
        <div className="cart_right">
          Total Items = {totalCartLength} <br />
          Total =RS {totalPrice} <br />
          Discount = RS {((1 / 100) * totalPrice).toFixed(2)} <br />
          <hr />
          Amount =RS {totalPrice - (1 / 100) * totalPrice} <br />
          <button className="buy">Buy</button>
        </div>
      </div>
    </>
  );
}
export default Cart;
