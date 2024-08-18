import Product from "../model/productmodel.js"

export const CreateProduct = async (req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json({
            success:true,
            message:"Product Create Successfull",
            product
        })
    } catch (error) {
        res.status(200).json({
            success:false,
            error:error.message
        })
    }
}

export const AllProducts = async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json({
            success:true,
            message:"Fetch All Products Successfull",
            products
        })
    } catch (error) {
        res.status(200).json({
            success:false,
            error:error.message
        })
    }
}


export const ProductById = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            success:true,
            message:"Fetch Product ById Successfull",
            product
        })
    } catch (error) {
        res.status(200).json({
            success:false,
            error:error.message
        })
    }
}

export const ProductUpdate = async (req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({
            success:true,
            message:"Product Update Successfull",
            product
        })
    } catch (error) {
        res.status(200).json({
            success:false,
            error:error.message
        })
    }
}

export const ProductDelete = async (req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:"Product Delete Successfull",
            product
        })
    } catch (error) {
        res.status(200).json({
            success:false,
            error:error.message
        })
    }
}