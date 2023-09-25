import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    contact:String,
    address:String
}

)
export default mongoose.model('admin',userSchema)
