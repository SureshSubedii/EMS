import mongoose from 'mongoose';
const productSchema=mongoose.Schema({
    name:String,
    photo:String,
    price:Number,
    description:String

})
export default mongoose.model('product',productSchema);