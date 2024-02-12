import express from 'express'
import { ProductManager } from '../Managers/ProductManager.js'

const viewsRouter = express.Router()

const pm = new ProductManager("./files/products.json")
const products = await pm.getProductsAsync()

viewsRouter.get('/',async (req,res) => {
    res.render('home',{products})
})

viewsRouter.get('/realTimeProducts',async(req,res) => {
    res.render('realTimeProducts',{products})
})

export {viewsRouter}