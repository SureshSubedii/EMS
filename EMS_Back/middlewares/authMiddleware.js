import { verify } from "jsonwebtoken"

const verifyJWT = (req, res, next)=> {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decode = verify(token, process.env.JWT_SECRET)
        const { password, ...user} = decode
        const adminRoutes = [/^\/manageUser\/deleteUser\/[a-fA-F0-9]{24}$/,/\/manageUser/, /\/addProduct/, /\/deleteProduct\/[a-fA-F0-9]{24}$/, /\/update/]; 
        const isRouteAdmin = adminRoutes.some(pattern => pattern.test(req.path));
        console.log(user)


        if(isRouteAdmin && user.role != 1){
            throw new Error()
         }
        req.user = decode
        next()
    }
     catch (error) {
        return  res.status(401).json({ "error": " You are not authorized for this action " });
        
    }

}



 export  default verifyJWT