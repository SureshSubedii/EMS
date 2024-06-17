import { verify } from "jsonwebtoken"

const verifyJWT = (req, res, next)=> {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decode = verify(token, process.env.JWT_SECRET)
        const { password, ...user} = decode
        const superAdminRoutes = [ /^\/manageUser\/deleteUser\/[a-fA-F0-9]{24}$/,/\/manageUser/]
        const adminRoutes = [/\/addProduct/, /\/deleteProduct\/[a-fA-F0-9]{24}$/, /\/update/]; 
        const isRouteAdmin = adminRoutes.some(pattern => pattern.test(req.path));
        const isSuper = superAdminRoutes.some(pattern => pattern.test(req.path))
        console.log(user, isRouteAdmin, isSuper, user.role ==2)
        
        if((isRouteAdmin && (user.role != 1 || user.role !=2)) || (isSuper  && user.role != 2)){
            throw new Error()
         }
        req.user = decode
        next()
    }
     catch (error) {
        console.log("here" )
        return  res.status(401).json({ "error": " You are not authorized for this action " });
        
    }

} 



 export  default verifyJWT