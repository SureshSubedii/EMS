import Order from "../schemas/orderSchema.js"

const addOrder = async(req, res)=>{
    try {
    const {orders, counts } =  req.body

    console.log(req.body)
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

export {addOrder}