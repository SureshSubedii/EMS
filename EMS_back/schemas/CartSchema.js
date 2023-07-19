import mongoose from "mongoose";

const cartSchema=mongoose.Schema({
    name:String,
    photo:String,
    price:Number,
    description:String,
    category:String,
    photo:{
        data:Buffer,
        contentType:String
    },
    uploaderId:String

}

)
export default mongoose.model('cart',cartSchema);
