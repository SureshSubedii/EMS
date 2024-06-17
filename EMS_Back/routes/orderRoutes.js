import express from 'express'
import verifyJWT from '../middlewares/authMiddleware.js'
import { addOrder, getOrders } from '../controller/orderController.js'


const route = express.Router()

route.post('/add', verifyJWT, addOrder)
route.get('/getOrders', verifyJWT, getOrders)


export default route