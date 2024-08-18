import bcrypt from "bcrypt"
import User from "../model/usermodel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"


export const Register = async (req,res,next)=>{
    try {
        const {name,email,password,avatar,role} = req.body;
        const existuser = await User.findOne({email});
        
        if(existuser){
           res.status(400).json({
            success:false,
            message:"user already exist"
           })
        }
        if(!name){
            res.status(400).json({
                success:false,
                message:"Plaese Enter Your Name"
               })
        }
        if(!email){
            res.status(400).json({
                success:false,
                message:"Plaese Enter Your email"
               })
        }
        if(!password){
            res.status(400).json({
                success:false,
                message:"Plaese Enter Your password"
               })
        }
        const hash = await bcrypt.hash(password,10)
        const user = await User.create({name,email,avatar,role,password:hash})
        const token = jwt.sign({id:user._id}, process.env.secret, {expiresIn:"1d"})
     
       
        res.cookie("token",token,{
            httpOnly:true,
            secure:true
        })
        res.status(200).json({
            success:true,
            message:"User Register Successfull",
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            error:error.message
           })
    }
}

export const Login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email){
            res.status(400).json({
                success:false,
                message:"Plaese Enter Your email"
               })
        }
        if(!password){
            res.status(400).json({
                success:false,
                message:"Plaese Enter Your password"
               })
        }
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({
                success:false,
                message:"user not found"
               })
        }
        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch){
          res.status(400).json({
            success:false,
            message:"invalid credential"
          })
        }
        const token = jwt.sign({id:user._id}, process.env.secret, {expiresIn:"1d"})
        res.cookie("token",token,{
            httpOnly:true,
            secure:true
        })
        res.status(200).json({
            success:true,
            message:"User login Successfull",
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
}

export const allusers = async (req,res,next)=>{
    try {
        const user = await User.find()
        res.status(200).json({
            success:true,
            message:"All Users Fetch Successfull",
            user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
}

export const userbyid = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        console.log(req.users._id)
        res.status(200).json({
            success:true,
            message:" Users Fetch Successfull",
            user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
}

export const forgotPassword = async (req,res)=>{
    try {
        const {email} = req.body;
        if(!email){
            res.status(400).json({
                success:false,
                message:"Plaese Enter Your email"
               })
        }
        const user = await User.findOne({email})
        const token = jwt.sign({email:user.email}, process.env.secret, {expiresIn:"1d"})
        if(!user){
            res.status(400).json({
                success:false,
                message:"user not found"
               })
        }

        const transporter = nodemailer.createTransport({
            service:"gmail",
            secure:true,
            auth:{
                user:process.env.GMAIL,
                pass:process.env.PASSWORD
            },
        });

        const reciever = {
            from:process.env.GMAIL,
            to:email,
            subject:"Reset Password Request",
            text:`click this link and create your new password ${process.env.local}/reset-password/${token}`
        }

        await transporter.sendMail(reciever);
        res.status(200).json({
            success:true,
            message:"successfull"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
}


export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Please enter a password"
            });
        }

        // Decode token to get email
        const decoded = jwt.verify(token, process.env.SECRET);
        const email = decoded.email;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Set new password
        user.password = hashedPassword;

        // Save user
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}


