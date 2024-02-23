import { Router } from "express";
import { CartManagerMongoose } from "../DAO/Mongo/Managers/cartManager.mongoose.js";
import { ProductManagerMongoose } from "../DAO/Mongo/Managers/productManager.mongoose.js";

const cartRouterMongoose = Router()
const cmm = new CartManagerMongoose()
const pmm = new ProductManagerMongoose()

//GET
cartRouterMongoose.get('/', async(req,res) => {
    let cart = await cmm.getCartAsync()
    res.send({cart:"success",payload:cart})
})

cartRouterMongoose.get('/:cid',async (req,res) => {
    let {cid} = req.params
    let cart = await cmm.getCartByIdAsync(cid)
    res.send({cart: "success", payload: cart})
})

//POST 
cartRouterMongoose.post('/',async(req,res) => {
    
    let cart = await cmm.addCartAsync()
    res.send({cart: "success", payload: cart})
})

cartRouterMongoose.post('/:cid/:pid',async(req,res) => {
    let {cid} = req.params
    
    let {pid} = req.params

    let cartToAddProduct = await cmm.addProductToCart(cid,pid)
    res.send({cartToAddProduct: "success", payload: cartToAddProduct})
})



export default cartRouterMongoose