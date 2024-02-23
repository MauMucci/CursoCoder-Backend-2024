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
            const cart = await this.getCartByIdAsync(cid) 

            if (!cart) {
                throw new Error ("Carrito no encontrado")
            }

            const pmm = new ProductManagerMongoose()
            const product = await pmm.getProductByIdAsync(pid);

            if (!product) {
                throw new Error ("Producto no encontrado")
            }
            console.log(cid,pid)
            
            cart.products.push({product:pid,quantity:1})
            
            await cart.save()

            return cart;
        }
            catch (error) {
                throw new Error(error.message);
              }

              

        }
    }
