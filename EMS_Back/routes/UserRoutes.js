import express from 'express';
import { deleteUSer, manageUSer, userLogin, userSignUp } from '../controller/userController.js';
const router=express.Router();

router.post('/userLogin',userLogin);
router.post('/userSignup',userSignUp);
router.get('/manageUser',manageUSer);
router.delete('/manageUser/deleteUser/:uid',deleteUSer);



export default router


