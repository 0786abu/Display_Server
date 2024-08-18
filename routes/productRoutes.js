import express from "express";
import { AllProducts, CreateProduct, ProductById, ProductDelete, ProductUpdate } from "../controller/productcontroller.js";


const ProducrRouter = express.Router()

ProducrRouter.route("/product").post(CreateProduct)
ProducrRouter.route("/product/:id").get(ProductById)
ProducrRouter.route("/productdelete/:id").delete(ProductDelete)
ProducrRouter.route("/productupdate/:id").put(ProductUpdate)
ProducrRouter.route("/products").get(AllProducts)

export default ProducrRouter