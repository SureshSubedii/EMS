import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import { dbConnect } from './db.js'
import ProductRoute from './routes/ProductRoute.js'
import UserRoute from './routes/UserRoutes.js'
import UserSchema from './schemas/UserSchema.js'
config({path:'./.env'}); 


//app configuration
const app=express();
const port= process.env.PORT ||  5000;





//MiddleWares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())



//Admin Routes
app.post('/createAdmin', async(req,res)=>{
    const adminCredentials=req.body;
    const unsecurePass=adminCredentials.password;
    const salt= await bcrypt.genSalt(10);
    const securePass= await bcrypt.hash(unsecurePass,salt);
    UserSchema.create({
        name:adminCredentials.name,
        email:adminCredentials.email,
        password:securePass,
        role:1
    })
})



//Routes
app.use('/api/v1/product',ProductRoute);
app.use('/api/v1/user',UserRoute);

  





//listening
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
    dbConnect();
})