import mongoose from "mongoose"
import Order from "../schemas/orderSchema.js"

const addOrder = async(req, res)=>{
    try {
    const {orders, counts } =  req.body
    const user = req.user._id
    const details = orders.map( (order,index) =>({
        pid: order.pid,
        quantity : counts[index]
    }))

   await  Order.create({
        userId : user,
        details: details
    })
res.status(201).json({"message": "Order Successfull"})}
catch(e){
    console.log(e)
    res.status(500).json({"message": e.message})
}

}

const getOrders = async(req,res)=>{
    try {
        const user = req.user
        let matchStage = { userId: { $eq: new mongoose.Types.ObjectId(user._id) }};
        console.log(user)

        if (user.role == 2){
            matchStage = { }
        }
        const orders = await Order.aggregate([
            {
                $match: matchStage
            },
        
         {   $lookup:{
            from : 'users',
            localField:'userId',
            foreignField: '_id',
            as: 'userDetails'
            }},{
                $unwind: '$userDetails'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'details.pid',
                    foreignField:'_id',
                    as : 'productDetails'
                }
            },{
                $addFields: {
                    'details':{
                        $map:{
                            input: '$details',
                            as : 'detail',
                            in : {
                                pid: '$$detail.pid',
                                quantity: '$$detail.quantity',
                                productInfo: {
                                    $arrayElemAt: [
                                        {
                                            $filter : {
                                                input: '$productDetails',
                                                as: 'prod',
                                                cond: {$eq: ['$$prod._id', '$$detail.pid']}
                                            }
                                        },0
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            {
                $project : {
                    userId:1,
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
                                price: '$$detail.productInfo.price'
                            }
                        }}
                }
            }
        ])

        res.status(200).json({data: orders})
        
    } catch (error) {
        console.log(error)
        
    }

}

export {addOrder,getOrders}