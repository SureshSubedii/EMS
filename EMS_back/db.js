import mongoose from "mongoose";

export const dbConnect=async()=>{
const connect=await mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
console.log("connected");
}