import express from 'express'
import { CartManager } from '../DAO/FileSystem/Manager/CartManager.js';
import { ProductManager } from '../DAO/FileSystem/Manager/ProductManager.js';
import { ProductManagerMongoose } from '../DAO/Mongo/Managers/productManager.mongoose.js';

const viewsRouter = express.Router()

//viewsRouter con FS
// viewsRouter.get('/',async (req,res) => {
//     const pm = new ProductManager("./files/products.json")
//     const products = await pm.getProductsAsync()
//     res.render('home',{products})
// })


//viewsRouter con Mongoose
// viewsRouter.get('/',async (req,res) => {
//     const productManagerMongoose  = new ProductManagerMongoose()
//     const products = await productManagerMongoose.getProductsAsync()
//     res.render('home',{products})
// })

viewsRouter.get('/', async (req, res) => {
    try {
        const productManagerMongoose = new ProductManagerMongoose();
        const { limit, page, sort, query } = req.query;
        const { payload: filteredProducts } = await productManagerMongoose.getProductsAsync({ limit, page, sort, query });

        res.render('home', { products: filteredProducts });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})


viewsRouter.get('/realTimeProducts',async(req,res) => {
    const pm = new ProductManager("./files/products.json")
    const products = await pm.getProductsAsync()
    res.render('realTimeProducts',{products})
})











export {viewsRouter}