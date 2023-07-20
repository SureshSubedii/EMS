import express from 'express';
import { deleteUSer, manageUSer, userLogin, userSignUp } from '../controller/UserController.js';
const router=express.Router();

router.post('/userLogin',userLogin);
router.post('/userSignup',userSignUp);
// router.post('/adminLogin',adminLogin);
router.get('/manageUser',manageUSer);
router.delete('/manageUser/deleteUser/:uid',deleteUSer);



export default router


