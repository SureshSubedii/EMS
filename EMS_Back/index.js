import bcrypt from 'bcrypt'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import { dbConnect } from './db.js'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoutes.js'
import UserSchema from './schemas/userSchema.js'
import { initializeSocket } from './sockets/socketHandler.js'
import Product from './schemas/productSchema.js'
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
app.use('/api/v1/product', productRoute);
app.use('/api/v1/user',userRoute);

app.get('/eg', async(req, res)=>{
    const data = await Product.aggregate([
        {
            $lookup: {
                from : "carts",
                localField: "_id",
                foreignField: "pid",
                as: 'cartData'

            }
        },
        {

            $unwind: '$cartData'
        },
        {
            $project: {
                name: 1,
                description:1,
                cartData:{name:1,userId:1}

            }
        }
    ])
    res.json(data);

})
//socket
const server = http.createServer(app)
initializeSocket(server)
//listening
server.listen(port,()=>{
    console.log(`Listening on port ${port}`)
    dbConnect();
})