import mongoose from "mongoose";
import validator from "validator";



const {Schema} = mongoose;

const userschema = new Schema({
    
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxlength:[20, "user cannot exceed 20 charatcer"]
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        validate:[validator.isEmail, "please enter valid email address"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
    },
    avatar:{
        type:String
    },
    role:{
        type:String,
        default:"user"
    }

})

const User = mongoose.model("User", userschema)

export default User