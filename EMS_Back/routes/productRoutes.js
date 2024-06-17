import express from 'express';
import formidable from 'express-formidable';
import { addProduct, addToCart, deleteProduct, getAllProducts, getProductPhoto, removeCart, showCart, updateProduct } from '../controller/productController.js';
import verifyJWT from '../middlewares/authMiddleware.js';
const route = express.Router();

route.post('/addProduct', formidable(), verifyJWT, addProduct);
route.get('/getAllProducts', verifyJWT, getAllProducts);
route.get('/getProductPhoto/:pid', getProductPhoto);
route.post('/addTocart', verifyJWT, addToCart)
route.get('/showCart/:userId', verifyJWT, showCart)
route.delete('/deleteProduct/:pid',verifyJWT, deleteProduct)
route.put('/update', verifyJWT,updateProduct);
route.delete('/cart', verifyJWT, removeCart);





export default route