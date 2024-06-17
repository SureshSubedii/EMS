import mongoose from 'mongoose'
import Order from '../schemas/orderSchema.js'
import Product from '../schemas/productSchema.js'

const addOrder = async (req, res) => {
  try {
    const { orders, counts } = req.body
    const user = req.user._id
    const details = orders.map((order, index) => ({
      pid: order.pid,
      quantity: counts[index]
    }))

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
    let matchStage = { userId: { $eq: new mongoose.Types.ObjectId(user._id) } }
    let filter1 = true
    let filter2 = true

    if (user.role == 2) {
      matchStage = {}
    } else if (user.role == 1) {
      filter1 = '$$prod.uploader'
      filter2 = new mongoose.Types.ObjectId(user._id)
      matchStage = {}
    }
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $lookup: {
          from: 'products',
          localField: 'details.pid',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $addFields: {
          details: {
            $map: {
              input: '$details',
              as: 'detail',
              in: {
                pid: '$$detail.pid',
                quantity: '$$detail.quantity',
                productInfo: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$productDetails',
                        as: 'prod',
                        cond: {
                          $and: [
                            { $eq: ['$$prod._id', '$$detail.pid'] },
                            { $eq: [filter1, filter2] }
                          ]
                        }
                      }
                    },
                    0
                  ]
                }
              }
            }
          }
        }
      },
      {
        $project: {
          userId: 1,
          userName: '$userDetails.name',
          contact: '$userDetails.contact',
          address: '$userDetails.address',
          details: {
            $map: {
              input: '$details',
              as: 'detail',
              in: {
                quantity: '$$detail.quantity',
                name: '$$detail.productInfo.name',
                price: '$$detail.productInfo.price',
                uploader: '$$detail.productInfo.uploader'
              }
            }
          }
        }
      },
      {
        $match: matchStage
      }
    ])
    let data = filterOrders(orders)
    res.status(200).json({ data: filterOrders(data, true) })
  } catch (error) {
    console.log(error)
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
