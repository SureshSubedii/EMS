import mongoose from "mongoose";

export const dbConnect=async()=>{

try{
     await mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
console.log("connected");
}
catch(err){
    console.error("Error Again", err);
}
}