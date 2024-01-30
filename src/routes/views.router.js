import express from 'express'
import { ProductManager } from '../Managers/ProductManager.js'
import path from 'path'

const viewsRouter = express.Router()
const pm = new ProductManager("./files/products.json")

viewsRouter.get('/',(req,res) => {
    res.render('index.handlebars',{})
})


export {viewsRouter}