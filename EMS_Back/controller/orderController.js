import mongoose from 'mongoose'
import Order from '../schemas/orderSchema.js'
import Product from '../schemas/productSchema.js'
import { filterQuery } from '../helpers/orderHelper.js'

const addOrder = async (req, res) => {
  try {
    const { orders, counts } = req.body
    const user = req.user._id
    const details = orders.map((order, index) => ({
      pid: order.pid,
      quantity: counts[index]
    }))
    console.log(user)

    await Order.create({
      userId: user,
      details: details
    })

     details.map(async (item) => {
      await Product.findByIdAndUpdate(
        item.pid,
        { $inc: { stock: -item.quantity } },
        { new: true } 
      );
   
    });

    res.status(201).json({ message: 'Order Successfull' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
}

const getOrders = async (req, res) => {
  try {
    const user = req.user
    const orders = await Order.aggregate(filterQuery(user.role, user._id))
    res.status(200).json({data: orders})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:error.message})

  }
}



const filterOrders = (orders, remove = false) => {
  if (remove) {
    return orders.map(o => ({
      ...o,
      details: filterDetails(o.details, remove)
    }))
  }

  return orders.filter(o => filterDetails(o.details))
}
const filterDetails = (details, remove = false) => {
  if (remove) {
    return details.filter(item => !isNaN(item.price))
  }
  return (
    details.reduce(
      (acc, curr) => acc + (isNaN(curr.price, 0) ? 0 : curr.price),
      0
    ) != 0
  )
}

export { addOrder, getOrders }
