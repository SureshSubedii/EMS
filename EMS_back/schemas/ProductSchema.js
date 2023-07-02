import mongoose from 'mongoose';
const productSchema=mongoose.Schema({
    name:String,
    photo:String,
    price:Number,
    description:String,
    category:String,
    image:{
        data:Buffer,
        contentType:String
    },
    uploader:String

})
export default mongoose.model('product',productSchema);