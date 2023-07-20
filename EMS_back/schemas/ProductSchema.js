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
    uploader:String,
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
      },

})
export default mongoose.model('product',productSchema);