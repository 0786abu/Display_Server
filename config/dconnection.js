import mongoose from "mongoose";


const dbconnection = async ()=>{
    try {
        const con = await mongoose.connect(process.env.DATABASE)
        console.log("DBConnection Successfull", con.connection.port)
    } catch (error) {
        console.log("connection failed", error)
    }
}
export default dbconnection