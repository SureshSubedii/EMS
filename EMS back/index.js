import mongoos from 'mongoose'
import cors from 'cors'
import express from 'express'
import User from './schemas/UserSchema.js'
import mongoose from 'mongoose';
import {config} from 'dotenv'
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
config();

//app configuration
const app=express();
const PORT=5000 || process.env;
const URL=process.env.REACT_APP_MONGO_URI; 

//MiddleWares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

//Database config
mongoose.connect(URL).then(()=>console.log("Done"))
.catch(error=>console.log(error));
 

//routes
app.post('/userLogin',async(req,res)=>{
   
   
    

})
app.post('./userSignUp',async(req,res)=>{
    const userCredentials=req.body
   
    const checkUser= await User.findOne({email:userCredentials.email})
    if(checkUser){
        return res.status(201).send("User Already Exists")
    }
    
    User.create({
        email:userCredentials.email,
        name:userCredentials.name
    })

})





//listening
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})