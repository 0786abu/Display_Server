import mongoose from "mongoose";


const {Schema} = mongoose;

const productschema = new Schema({
    title:{
        type:String,
        required:[true, "please enter product title"]
    },
    description:{
        type:String,
        required:[true, "please enter product description"]
    },
    price:{
        type:Number,
        maxlength:[6, "price cannot exceed 6 character"]
    },
    discountpercent:{
        type:Number,
        maxlength:[2, "price cannot exceed 2 character"]
    },
    brand:{
        type:String,
        required:[true,"please enter product brand"]
    },
    category:{
        type:String,
        required:[true,"please enter product category"]
    },
    images:{
        type:[],
        required:true
    },
    warranty:{
        type:String
    },
    stock:{
        type:Number,
        maxlength:[6, "stock cannot exceed 6 character"]
    },
    feature_product:{
        type:String
    },
    trending:{
        type:String
    }
})

const Product = mongoose.model("Product", productschema)

export default Product