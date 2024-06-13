import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  pid:{
    type: Schema.Types.ObjectId,
    required: true,

  }
});

export default mongoose.model('cart', cartSchema);
