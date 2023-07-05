import express from 'express';
import { adminLogin, userLogin, userSignUp } from '../controller/UserController.js';
const router=express.Router();

router.post('/userLogin',userLogin);
router.post('/userSignup',userSignUp);
router.post('/adminLogin',adminLogin);

export default router


