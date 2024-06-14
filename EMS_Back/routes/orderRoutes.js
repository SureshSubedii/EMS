import express from 'express'
import verifyJWT from '../middlewares/authMiddleware.js'
import { addOrder } from '../controller/orderController.js'


const route = express.Router()

route.post('/add', verifyJWT, addOrder)

export default route