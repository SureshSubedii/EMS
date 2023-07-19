import express from 'express';
import formidable from 'express-formidable';
import { addProduct, addToCart, getAllProducts, getProductPhoto, showCart } from '../controller/ProductController.js';
const router=express.Router();

router.post('/addProduct',formidable(),addProduct);
router.get('/getAllProducts',getAllProducts);
router.get('/getProductPhoto/:pid', getProductPhoto);
router.post('/addTocart',addToCart)
router.get('/showCart/:userId',showCart)


export default router