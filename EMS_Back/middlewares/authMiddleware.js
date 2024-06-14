import { verify } from "jsonwebtoken"

const verifyJWT = (req, res, next)=> {
    try {
        const decode = verify(req.headers.authorization, process.env.JWT_SECRET)
        const { password, ...user} = decode
        req.user = user
        next()

    } catch (error) {
        return  res.status(401).json({ "error": "Login with the correct credentials." });
        
    }

}

 export default verifyJWT