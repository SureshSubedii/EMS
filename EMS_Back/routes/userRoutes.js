import express from 'express';
import { deleteUser, manageUSer, userLogin, userSignUp } from '../controller/userController.js';
import verifyJWT from '../middlewares/authMiddleware.js';
const router=express.Router();

router.post('/userLogin', userLogin);
router.post('/userSignup', userSignUp);
router.get('/manageUser', verifyJWT, manageUSer);
router.delete('/manageUser/deleteUser/:uid', verifyJWT, deleteUser);



export default router


