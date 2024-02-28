import { Router } from "express";
import { CartManagerMongoose } from "../DAO/Mongo/Managers/cartManager.mongoose.js";
import {ProductManagerMongoose} from "../DAO/Mongo/Managers/productManager.mongoose.js";

const cartRouterMongoose = Router()
const cartManagerMongoose = new CartManagerMongoose()

//GET
cartRouterMongoose.get('/api/carts', async(req,res) => {
    let cart = await cartManagerMongoose.getCartAsync().populate(products.product)
    res.send({cart:"success",payload:cart})
})

cartRouterMongoose.get('/api/carts/:cid',async (req,res) => {
    try{
        let {cid} = req.params
        let cart = await cartManagerMongoose.getCartByIdAsync(cid)
        res.send({cart: "success", payload: cart})
    }
    catch(error){
        console.error("Error al obtener el carrito:", error);
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
})

//POST 
cartRouterMongoose.post('/api/carts',async(req,res) => {
    
    let cart = await cartManagerMongoose.addCartAsync()
    res.send({cart: "success", payload: cart})
})

cartRouterMongoose.post('/api/carts/:cid/products/:pid',async(req,res) => {
    try{
        let {cid} = req.params
        let {pid} = req.params

        let cartToAddProduct = await cartManagerMongoose.addProductToCart(cid,pid)
        console.log(`Se agrego el producto ${pid} al carrido ${cid}`)
        res.send({cartToAddProduct: "success", payload: cartToAddProduct})
    }
    catch(error){ 
    
        console.error("Error al agregar el carrito:", error);
        res.status(500).json({ message: 'Error al agregar el producto en el carrito', error: error.message });
    }
})


//DELETE
cartRouterMongoose.delete('/api/carts/:cid/products/:pid',async(req,res) => {
    let {cid} = req.params
    let {pid} = req.params
    let cartUpdated = await cartManagerMongoose.deleteProductFromCart(cid,pid)

    res.send({cartUpdated:"sucess",payload: cartUpdated})

})

//PUT
cartRouterMongoose.put('/api/carts/:cid',async(req,res) => {

    try {
        
    
        let {cid} = req.params
        let {products} = req.body
        let cartUpdated = await cartManagerMongoose.updateCartProducts(cid,products)

        res.send({cartUpdated:"success",payload: cartUpdated})

    }catch(error){
        console.error("Error al actualizar el carrito:", error);
        res.status(500).json({ message: 'Error al actualizar el carrito', error: error.message });
    }

}
)

cartRouterMongoose.put('/api/carts/:cid/products/:pid',async(req,res) => {

    try{
        let {cid} = req.params
        let {pid} = req.params
        let {quantity} = req.body

        const cartUpdated = await cartManagerMongoose.updateProductQuantity(cid,pid,quantity)
    
        res.send({ status: "success", message: "Cantidad de ejemplares del producto actualizada correctamente", payload: cartUpdated });
    
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al actualizar la cantidad de productos en el carrito", error: error.message });
    }
})


cartRouterMongoose.delete('/api/carts/:cid',async (req,res) => {

    try {
        let {cid} = req.params
        const cartUpdated = await cartManagerMongoose.deleteAllProductsFromCart(cid)

        res.send({status: "Success",message: `Se eliminaron todos los productos del carrito ${cid}`,payload:cartUpdated})

    } catch (error) {
        res.status(500).send({ status: "error", message: `Error al eliminar los producto en el carrito ${cid}`, error: error.message });
    }
})

export default cartRouterMongoose