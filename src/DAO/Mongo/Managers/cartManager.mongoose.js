import CartModel from "../Models/Cart.model.js";
import { ProductManagerMongoose } from "./productManager.mongoose.js";


export class CartManagerMongoose{

    getCartAsync = async () => {
        return await CartModel.find()
    }

    getCartByIdAsync = async (cid) => {
        return await CartModel.findById(cid)
    }

    addCartAsync = async() => {
        return await CartModel.create({})
    }

    addProductToCart = async (cid,pid) => {
        try{

            const cartManagerMongoose = new CartManagerMongoose()
            const cart = await cartManagerMongoose.getCartByIdAsync(cid) 

            if (!cart) {
                throw new Error ("Carrito no encontrado")
            }

            const productManagerMongoose = new ProductManagerMongoose()
            const product = await productManagerMongoose.getProductByIdAsync(pid);

            if (!product) {
                throw new Error ("Producto no encontrado")
            }
            console.log(cid,pid)
            
            cart.products.push({product:pid,quantity:1})
            
            await cart.save()

            return cart;
        }
            catch (error) {
                throw new Error(error.message)
            }
        }
        
    deleteProductFromCart = async (cid,pid) => {
        try {

            const cartManagerMongoose = new CartManagerMongoose()
            const cart = await cartManagerMongoose.getCartByIdAsync(cid)

            if(!cart){
            throw new Error(`No se encontró el carrito con id ${cid}`)
            }

            // Encuentra el índice del producto en el carrito
            const productIndex = cart.products.findIndex(p => p.product.toString() === pid);

            if (productIndex === -1) {
                throw new Error(`No se encontró el producto con id ${pid} en el carrito`);
            }

            // Elimina el producto del carrito
            cart.products.splice(productIndex, 1);

            // Guarda los cambios en la base de datos
            await cart.save();
            return cart;

        } catch (error) {
    
            throw new Error(error.message);
        }
    }


    updateCartProducts = async (cid,products) => {

        try {
            const cartManagerMongoose = new CartManagerMongoose()
            const cart = await cartManagerMongoose.getCartByIdAsync(cid)

            if(!cart){
                throw new Error (`No se encontro el carrito ${cid}`)
            }

            console.log(cart.products)
            console.log(products)
            //Actualizo el carrito con los productos enviados en el body
            cart.products = products

            //Guardo en la bdd
            await cart.save()

            return
            
        }
        catch (error) {
            // Manejar errores
            console.error("Error al actualizar el carrito:", error);
        }
    }


    updateProductQuantity = async (cid, pid, quantity) => {
        try {
            
            const cartManagerMongoose = new CartManagerMongoose()
            const cart = await cartManagerMongoose.getCartByIdAsync(cid);
            if (!cart) {
                throw new Error(`No se encontró el carrito con ID ${cid}`);
            }
    
            // Busca el producto en el carrito por su ID
            const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
            
            if (productIndex === -1) {
                throw new Error(`No se encontró el producto con ID ${pid} en el carrito`);
            }
    
            // Actualiza la cantidad de ejemplares del producto
            cart.products[productIndex].quantity = quantity;
    
            // Guarda los cambios en la base de datos
            await cart.save();
    
            return cart;

        } catch (error) {
            throw new Error(error.message);
        }
    }


    deleteAllProductsFromCart = async (cid) => {

        try{

            const cartManagerMongoose = new CartManagerMongoose()
            const cart = await cartManagerMongoose.getCartByIdAsync(cid)

        if (!cart) {
            throw new Error(`No se encontró el carrito con ID ${cid}`);
        }

        cart.products = []

        await cart.save();
        }
        
        catch (error){

            console.error("Error al eliminar productos del carrito:", error);
            res.status(500).json({ status: 'error', message: 'No se pudo eliminar los productos del carrito' });
        }
    }
    }
