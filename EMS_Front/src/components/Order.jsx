import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { adminCheck, checkUser } from '../stateManagement/userSlice';
import '../styles/orders.css'

const Order = () => {
    const [orders, setOrders] = useState([{"_id": "1", "details":[{"name": "New", "quantity":1,"price":100}, {"name": "Old", "quantity":2,"price":100}]},{"_id": "2", "details":[{"name": "New", "quantity":1,"price":100}, {"name": "Old", "quantity":2,"price":100}]}]);  
    const user = useSelector(checkUser);
  const admin = useSelector(adminCheck);
  const userTableRef = useRef(null);
  const [price, setPrice] = useState(0)
  let total = 0

  useEffect(() => {
    // axios.get("order/getOrders", {
    //   headers: {
    //     "Authorization": `Bearer ${user}`
    //   }
    // })
    // .then((response) => {
    //   setOrders(response.data);
    // })
    // .catch((error) => {
    //   console.error("Error fetching orders:", error);
    // });

    // Initialize DataTable when component mounts
  
  }, [user]);

  return (
    <div className="orders">
      <h1 align="center">List of Orders</h1>
      <table className="tableList" ref={userTableRef}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, orderIndex) => (
            order.details.map((detail, detailIndex) => (
              <tr align="center" key={`${order._id}-${detailIndex}`}>
                {detailIndex === 0 && ( // Render order ID only on the first product row
                  <td rowSpan={order.details.length}>{order._id}</td>
                )}

                <td>{detail.name}</td>
                <td>{detail.quantity}</td>
                <td>{detail.price  *detail.quantity}</td>
                {detailIndex === 0 && ( // Render total only on the first product row
                  <td rowSpan={order.details.length}>
                    {order.details.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
                    </td>
                )}
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
