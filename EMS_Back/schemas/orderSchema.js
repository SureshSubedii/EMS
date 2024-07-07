import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    created_at: {
        type:Date,
        default: Date.now
    },
    transactionId: {
        type:String,
        default: null
    },
    details: [{
        pid: Schema.Types.ObjectId,
        quantity: Number
    }]
})

export default mongoose.model('order', orderSchema)