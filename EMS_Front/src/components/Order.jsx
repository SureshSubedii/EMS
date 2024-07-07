import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { checkUser } from '../stateManagement/userSlice'
import '../styles/orders.css'
import axios from '../axios'
import { toast } from "react-toastify";


const Order = ({ admin, superAdmn }) => {
  const [orders, setOrders] = useState([])
  const user = useSelector(checkUser)
  const userTableRef = useRef(null)
  const [message, setMessage] = useState(' Total ')

  useEffect(() => {
    setMessage(admin ? 'Received ' : message)

    axios
      .get('order/getOrders', {
        headers: {
          Authorization: `Bearer ${user}`
        }
      })
      .then(response => {
        setOrders(response.data.data)
      })
      .catch(error => {
        toast.error(error.message)
        console.error('Error fetching orders:', error)
      })
  }, [user])

  return (
    <div className='orders'>
      <h1 align='center'>List of {message}Orders</h1>
      <table className='tableList' ref={userTableRef}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
            {(superAdmn || admin) && ( <><th>Ordered By</th><th> Contact</th><th> Address</th></>)}
            <th>Transaction Id</th>


            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, orderIndex) =>
            order.details?.map((detail, detailIndex) => (
              <tr align='center' key={`${order._id}-${detailIndex}`}>
                {detailIndex === 0 && (
                  <td rowSpan={order.details.length}>{order._id}</td>
                )}

                <td>{detail.name}</td>
                <td>{detail.quantity}</td>

                <td>{detail.price * detail.quantity}</td>

                {(superAdmn || admin) && detailIndex === 0 && (
                  <><td rowSpan={order.details.length}> {order.userName}</td><td rowSpan={order.details.length}> {order.contact}</td><td rowSpan={order.details.length}> {order.address}</td></>

                )}
                {detailIndex === 0 && (
                  <>
                  <td rowSpan={order.details.length}>
                    {order.transactionId}
                    </td>

                  <td rowSpan={order.details.length}>
                    {order.details.reduce(
                      (acc, curr) => acc + curr.price * curr.quantity,
                      0
                    )}
                  </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Order
