import express from 'express'
import { ProductManager } from '../Managers/ProductManager.js'

const viewsRouter = express.Router()



viewsRouter.get('/',async (req,res) => {
    const pm = new ProductManager("./files/products.json")
    const products = await pm.getProductsAsync()
    res.render('home',{products})
})

viewsRouter.get('/realTimeProducts',async(req,res) => {
    const pm = new ProductManager("./files/products.json")
    const products = await pm.getProductsAsync()
    res.render('realTimeProducts',{products})
})

export {viewsRouter}