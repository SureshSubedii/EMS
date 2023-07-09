import express from 'express';
import { addPRoduct, getAllProduct, getProdPhoto, upload } from '../controller/ProductController.js';
const router=express.Router();

router.post('/addProduct',upload,addPRoduct);
router.get('/getAllProducts',getAllProduct);
router.get('/getProductPhoto/:pid', getProdPhoto);

export default router