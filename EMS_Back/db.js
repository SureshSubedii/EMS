import mongoose from "mongoose";

export const dbConnect=async()=>{

try{ const connect=await mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
console.log("connected");
}
catch(err){
    console.log(" Error Again",err)
}
}