import { verify } from "jsonwebtoken"

const verifyJWT = (req, res, next)=> {
    try {
        const decode = verify(req.headers?.authorization, process.env.JWT_SECRET)
        console.log(decode)
        next()

    } catch (error) {
        return  res.status(401).json({ "error": "Login with the correct credentials." });
        
    }

}

 export default verifyJWT