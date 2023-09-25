import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../schemas/UserSchema.js';




const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await User.findOne({ email } );

        if (!checkUser) {
           return  res.status(404).json({ "error": "Login with the correct credentials." });
        }


        const isPasswordValid = await bcrypt.compare(password, checkUser.password);
        if (!isPasswordValid) {
           return  res.status(401).json({ "error": "Invalid credentials. Please try again." });
        }

        const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET);
        let responseData={
            token,
            "uploader": checkUser.name,
            "userId": checkUser._id,

        }

      
        if(checkUser.role==1) {
            responseData = {
                ...responseData,
                "admin": true
            }

        }
       return  res.status(200).json(responseData);
    }
    catch (error) {
         res.status(500).json({ "error": "Server Error" });
    }
}


const userSignUp = async (req, res) => {
    const userCredentials = req.body;

    try {
        let checkUser = await User.findOne({ email: userCredentials.email })
        if (checkUser) {
            return res.status(409).json({ "error": "User Already Exists" })
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const protectedPass = await bcrypt.hash(userCredentials.password, salt);

            const createUser = await User.create({
                email: userCredentials.email,
                name: userCredentials.name,
                password: protectedPass,
                contact: userCredentials.contact,
                address: userCredentials.address
            })
            const token = jwt.sign({ id: createUser._id }, process.env.JWT_SECRET);

            res.status(201).json({ token, "uploader": createUser.name, "success": "Sucessfully Registered" })
        }



    }

    catch (err) {
        res.status(500).send({ "error": "Internal Server Error" });
    }
}


//    const adminLogin =async(req,res)=>{
//         const adminCredentials=req.body;
//         try{
//         const checkAdmin= await Admin.findOne({email:adminCredentials.email})
//         if(checkAdmin){
//             const comparePass= await bcrypt.compare(adminCredentials.password,checkAdmin.password);
//             if(comparePass){
//             const token = jwt.sign({id:checkAdmin._id},"dsfdsfd8943534");
//             res.status(200).json({token,"uploader":checkAdmin.name});


//             }
//             else{
//                 res.json({"error":"Login with correct credentials"})
//             }
//         }
//         else{
//             res.status(404).json({"error":"Login with correct credentials"})


//         }}
//         catch(error){
//             res.status(500).json({"error":`${error} Internal server Error`})
//         }

//         }

const manageUSer = (req, res) => {
    User.find().then(data => {
        res.status(200).send(data)
    })
        .catch((err) => {

            console.log(err)
            res.status(500).send("Internal Server Error")

        })
}
const deleteUSer = (req, res) => {
    const userId = req.params.uid
    User.deleteOne({ _id: userId }).then(() => {
        res.status(200).json({ "success": "Deleted Sucessfully" })

    }
    )
        .catch(() => res.status(500).json({ error: "Eror in deleting user!" }))

}

export { deleteUSer, manageUSer, userLogin, userSignUp };

