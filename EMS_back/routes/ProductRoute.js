import express from 'express';
import { addPRoduct, upload } from '../controller/ProductController.js';
const router=express.Router();

router.post('/addProduct',upload,addPRoduct);
export default router