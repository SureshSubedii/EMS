import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../schemas/AdminSchema.js';
import User from '../schemas/UserSchema.js';




const userLogin =async(req,res)=>{
    try{
       const userCredentials=req.body;
        let checkUser= await User.findOne({email:userCredentials.email})
        if(!checkUser){
            res.status(404).json({"error":"Login with the correct credentials"});
        }
        
        else{
            const pass= await bcrypt.compare(userCredentials.password,checkUser.password);
            if(pass){
                    const token=jwt.sign({id:checkUser._id},"s4589454988@asd&^%asd1asd2##");
                    res.status(200).json({token,"uploader":checkUser.name})

                }
                else{
                    res.status(404).json({"error":"Login with the correct credentials"});

                }
            }}
            catch(error){
                res.status(500).json({"error":`Internal Server Error ${error}`});
               }
            }


const userSignUp=async(req,res)=>{
    const userCredentials=req.body;

    try{
    let checkUser= await User.findOne({email:userCredentials.email})
    if(checkUser){
        return res.status(409).json({"error":"User Already Exists"})
    }
    const salt= await bcrypt.genSalt(10);
    const protectedPass= await bcrypt.hash(userCredentials.password,salt);

    const createUSer=await User.create({
        email:userCredentials.email,
        name:userCredentials.name,
        password:protectedPass,
        contact:userCredentials.contact,
        address:userCredentials.address
    })
   
    const token=jwt.sign({id:createUSer._id},"s4589454988@asd&^%asd1asd2##");
    res.status(201).json({token,"uploader":checkUser.name})
    }
    catch(err){
        res.status(500).send(err);
    } 
}


   const adminLogin =async(req,res)=>{
        const adminCredentials=req.body;
        try{
        const checkAdmin= await Admin.findOne({email:adminCredentials.email})
        if(checkAdmin){
            const comparePass= await bcrypt.compare(adminCredentials.password,checkAdmin.password);
            if(comparePass){
            const token = jwt.sign({id:checkAdmin._id},"dsfdsfd8943534");
            res.status(200).json({token,"uploader":checkAdmin.name});
    
    
            }
            else{
                res.json({"error":"Login with correct credentials"})
            }
        }
        else{
            res.status(404).json({"error":"Login with correct credentials"})
    
    
        }}
        catch(error){
            res.status(500).json({"error":`${error} Internal server Error`})
        }
    
        }


export { adminLogin, userLogin, userSignUp };
