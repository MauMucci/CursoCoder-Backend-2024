import express from 'express'
import { ProductManager } from '../Managers/ProductManager.js'
import path from 'path'

const viewsRouter = express.Router()
const pm = new ProductManager("./files/products.json")


//ejemplo para mostrar en index
// viewsRouter.get('/',(req,res) => {
//     const user = {
//         name:"Hilda",
//         last_name:"Perez"
        
//     }
//     res.render('index',user)
//     console.log("adentro")
// })

viewsRouter.get('/',async (req,res) => {
    const products = await pm.getProductsAsync()
    console.log(products);
    res.render('index',{products})
    console.log("adentro2")
})


export {viewsRouter}