import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express'
import User from './schemas/UserSchema.js'
import {config} from 'dotenv'
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
config({path:'./.env'}); 

//app configuration
const app=express();
const port= process.env.PORT ||  4000;
const URL=process.env.MONGO_URI; 

//MiddleWares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

//Database config
mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("Done"))
.catch((error)=>console.log("Error connecting:",error));
 

//routes
app.post('/userLogin',async(req,res)=>{

    try{
       const userCredentials=req.body;
        const checkUser= await User.findOne({email:userCredentials.email})
        if(!checkUser){
            res.status(404).json({"error":"Login with the correct credentials"});
        }
        
        else{
            const pass= await bcrypt.compare(userCredentials.password,checkUser.password);
            if(pass){
                    // res.status(200).send("Successful")
                    const token=jwt.sign({id:checkUser._id},"s4589454988@asd&^%asd1asd2##");
                    // console.log(token);
                    res.status(200).json({token})

                }
                else{
                    res.status(404).json({"error":"Login with the correct credentials"});

                }
            }}
            catch(error){
                res.status(500).json({"error":"Internal Server Error"});
               }
})

app.post('/userSignUp',async(req,res)=>{
    const userCredentials=req.body;

    try{
    const checkUser= await User.findOne({email:userCredentials.email})
    if(checkUser){
        return res.status(409).json({"error":"User Already Exists"})
    }
    const salt= await bcrypt.genSalt(10);
    const protectedPass= await bcrypt.hash(userCredentials.password,salt);

    const createUSer=await User.create({
        email:userCredentials.email,
        name:userCredentials.name,
        password:protectedPass,
        contact:userCredentials.contact,
        address:userCredentials.address
    })
   
    const token=jwt.sign({id:createUSer._id},"s4589454988@asd&^%asd1asd2##");
    // console.log(token);
    res.status(201).json({token})
    }
    catch(err){
        res.status(500).send(err);
    } 

})





//listening
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})