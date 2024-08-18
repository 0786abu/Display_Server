import express from "express";
import dotenv from "dotenv";
import dbconnection from "./config/dconnection.js";
import Product from "./model/productmodel.js";
import cors from "cors"
import ProducrRouter from "./routes/productRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import User from "./model/usermodel.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

const port = process.env.PORT || 4100;

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/p1", ProducrRouter)
app.use("/u1", UserRouter)

dbconnection()
Product()
User()

app.listen(port, ()=>{
    console.log(`server is listening on the port ${port}`)
})