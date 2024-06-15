import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema=new Schema({
    name:String,
    photo:String,
    price:Number,
    description:String,
    category:String,
    photo:{
        data:Buffer,
        contentType:String
    },
    uploader:{
        type: Schema.Types.ObjectId,
        required: true
    },
    stock:Number
  

})
export default mongoose.model('product',productSchema);