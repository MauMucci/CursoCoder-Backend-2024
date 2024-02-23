import { Router } from "express"
import { ProductManagerMongoose } from "../DAO/Mongo/Managers/productManager.mongoose.js"


const productsRouterMongoose = Router()
const pmm = new ProductManagerMongoose()

//GET
productsRouterMongoose.get('/',async (req,res) => {
    try {
        let{title,description,thumbnail,code,stock,price,status} = req.body
        let products = await pmm.getProductsAsync({title,description,thumbnail,code,stock,price,status})
        res.send({result: "success", payload:products })
        
    } catch (error) {
        
    }
})


productsRouterMongoose.get('/:pid',async (req,res) => {
    try{
        let {pid} = req.params
        let product = await pmm.getProductByIdAsync(pid)
        res.send({result: "success",payload: product})
    }

    catch (error) {
        
    }
})

//POST
productsRouterMongoose.post('/',async(req,res) => {
    let {title,description,thumbnail,code,stock,price,status} = req.body
 
   const newProduct = await pmm.addProductAsync({title,description,thumbnail,code,stock,price,status})
    res.send({products: "success",payload:newProduct})
})

//PUT
productsRouterMongoose.put('/:pid',async(req,res) => {
    let {pid} = req.params
    let productToReplace = req.body

    const productUpdated = await pmm.updateProductAsync(pid,productToReplace)
    res.send({productUpdated:"success", payload: productUpdated})
})

//DELETE
productsRouterMongoose.delete('/:pid',async(req,res)=> {
    let {pid} = req.params
    let productToDelete = await pmm.deleteProductAsync(pid)
    res.send({productToDelete:"success",payload: productToDelete})
})

export default productsRouterMongoose