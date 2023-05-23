import mongoos from 'mongoose'
import cors from 'cors'
import express from 'express'
import User from './schemas/UserSchema.js'

//app configuration
const app=express();
const PORT=5000 || process.env;

//MiddleWares

//Database config


//routes
app.post('./user',(req,res)=>{
    const userCredentials=req.body
    

})





//listening
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})