import express from 'express';
import { CartManager } from '../Managers/CartManager.js';
import { ProductManager } from '../Managers/ProductManager.js';

const cartsRouter = express.Router();

let cm = new CartManager('./files/carts.json')
let pm = new ProductManager('./files/products.json')

//------------ GET ------------
cartsRouter.get('/:cid',async(req,res) => {
    try {
        let cid = req.params.cid
        cid = parseInt(cid)

        if(cid && !isNaN(cid))
        {
            let cartSelectedById = await cm.getCartByIdAsync(cid)
            res.send(cartSelectedById)
        }
        else{
            res.status(404).json({error: "Carrito no encontrado"})
        }
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

//------------ POST ------------
cartsRouter.post('/:cid/product/:pid',async(req,res) => {

    try{
      console.log("1- Entro al endpoint")
        const cid = parseInt(req.params.cid);        
        const pid = parseInt(req.params.pid);  
     
        if(cid && !isNaN(cid) && pid && !isNaN(pid))
        {                       
            console.log(`Carrito: ${cid} Producto: ${pid} desde POST`)  
            const cartSelectedById = await cm.getCartByIdAsync(cid)     

            if (cartSelectedById) {
              console.log("2- carrito encontrado")
              const productSelectedById = await pm.getProductsByIdAsync(pid);                

              if (productSelectedById) {
                console.log(("3- producto encontrado"))
                console.log(`data ${cartSelectedById.id}, ${productSelectedById.id}`);
                await cm.addProductToCartAsync(cartSelectedById.id, productSelectedById.id);
                console.log("Producto agregado al carrito correctamente");
                res.status(200).json({ message: "Producto agregado al carrito correctamente" });
                } else {
                  res.status(404).json({ error: `Producto con ID ${pid} no encontrado` });
                  }
                } else {
                  res.status(404).json({ error: `Carrito con ID ${cid} no encontrado` });
                }
              } else {
                res.status(400).json({ error: "Parámetros inválidos en la solicitud" });
              }
            }
            catch(error){
                console.error("Error al agregar carrito de compras", error);
                res.status(500).json({ error: "error" });
            }
        })
           

export {cartsRouter}
