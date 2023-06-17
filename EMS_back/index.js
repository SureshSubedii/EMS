import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'
import { dbConnect } from './db.js'
import Admin from './schemas/AdminSchema.js'
import User from './schemas/UserSchema.js'

config({path:'./.env'}); 


//app configuration
const app=express();
const port= process.env.PORT ||  5000;


//Database config


//MiddleWares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())



//Admin Routes
app.post('/createAdmin', async(req,res)=>{
    const adminCredentials=req.body;
    const unsecurePass=adminCredentials.password;
    const salt= await bcrypt.genSalt(20);
    const securePass= await bcrypt.hash(unsecurePass,salt);
    Admin.create({
        name:adminCredentials.name,
        password:securePass,
        email:adminCredentials.email
    })
})

app.post('/loginAdmin', async(req,res)=>{
    const adminCredentials=req.body;
    console.log(adminCredentials.email)
    try{
    const checkAdmin= await Admin.findOne({email:adminCredentials.email})
    if(checkAdmin){
        res.status(200).send({"success":"Admin found"})
        const comparePass= await bcrypt.compare(adminCredentials.password,checkAdmin.password);
        if(comparePass){
        console.log("success");


        }
        else{
            console.log("Incorrect")
        }
    }
    else{
        res.status(404).send({"failed":"Admin not found"})
        console.log("Failure")


    }}
    catch(error){
        console.error(error);
    }

    })


//User Routes
app.post('/userLogin',async(req,res)=>{
    try{
       const userCredentials=req.body;
        let checkUser= await User.findOne({email:userCredentials.email})
        if(!checkUser){
            res.status(404).json({"error":"Login with the correct credentials"});
        }
        
        else{
            const pass= await bcrypt.compare(userCredentials.password,checkUser.password);
            if(pass){
                    const token=jwt.sign({id:checkUser._id},"s4589454988@asd&^%asd1asd2##");
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
    let checkUser= await User.findOne({email:userCredentials.email})
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
    dbConnect();
})