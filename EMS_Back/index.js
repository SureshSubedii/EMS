import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import { dbConnect } from './db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import User from './schemas/userSchema.js'



import UserSchema from './schemas/userSchema.js'
config({path:'./.env'}); 


//app configuration
const app=express();
const port= process.env.PORT ||  5000;


//db
dbConnect();



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
        role:2
    })
})


//Routes
app.get('/', async(req, res) => {
    const checkUser = await User.findOne({ email:"sureshsubedi485@gmail.com" })
    res.send(checkUser)




})
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/order', orderRoutes);



//socket
// const server = http.createServer(app)
// initializeSocket(server)
//listening
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})