import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import { dbConnect } from './db.js'
import ProductRoute from './routes/ProductRoute.js'
import UserRoute from './routes/UserRoutes.js'
import Admin from './schemas/AdminSchema.js'
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
    const salt= await bcrypt.genSalt(20);
    const securePass= await bcrypt.hash(unsecurePass,salt);
    Admin.create({
        name:adminCredentials.name,
        password:securePass,
        email:adminCredentials.email
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