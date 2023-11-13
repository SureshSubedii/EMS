import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateJWT =(user)=> {
    try {
    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET)
    return  token
        
    } catch (error) {
        console.log(error.message)
        
    }

}

const hashPassword = async(password)=> {

    return await bcrypt.hash(password, 10)

} 

export {generateJWT, hashPassword}