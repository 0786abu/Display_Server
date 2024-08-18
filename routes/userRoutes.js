import express from "express";
import { allusers, forgotPassword, Login, Register, resetPassword, userbyid } from "../controller/usercontroller.js";


const UserRouter = express.Router()

UserRouter.route("/register").post(Register)
UserRouter.route("/forgot").post(forgotPassword)
UserRouter.route("/reset-password/:token").post(resetPassword)
UserRouter.route("/login").post(Login)
UserRouter.route("/users").get(allusers)
UserRouter.route("/users/:id").get(userbyid)


export default UserRouter