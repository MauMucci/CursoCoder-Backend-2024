import express from 'express';
import { ProductManager } from '../Managers/ProductManager.js';

const productsRouter = express.Router()

let pm = new ProductManager("./files/products.json")

//------------ GET ------------
productsRouter.get("/",async (req,res) => {
    
    try{
        console.log("Se mostrarán todos los productos");
    const productsGotten = await pm.getProductsAsync()

    let limit = req.query.limit; //en la url debe decir localhost:8080/products/?limite=3
    
    if (limit && !isNaN(limit) && productsGotten.length > limit) {
        console.log(limit)
        const limitedProductsList = productsGotten.slice(0, limit)  //slice crea un nuevo array que contiene los primeros -limit- elementos de products
        res.send({ limitedProductsList });
    }else{
        res.json(productsGotten)
    }
    }
    catch(error){
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error interno del servidor" });// OK error desde el servidor?

    }
})

productsRouter.get('/:pid',async (req,res)=> {
    
    try{
        let pid = req.params.pid
        pid = parseInt(pid)
    
        if(pid && !isNaN(pid)){        
            let productSelectedById = await pm.getProductsByIdAsync(pid)
            res.send(productSelectedById)
        } else {res.status(404).json({ error: "Producto no encontrado" })};
    }
   catch (error){
    console.error("Error al obtener producto por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    }})

//------------ POST ------------
productsRouter.post('/',async (req,res)=> {
    try {
        let newProduct = req.body;
        await pm.addProductsAsync(newProduct);
        res.status(400).send({ status: "success", message: "producto agregado" });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

//------------ PUT ------------
productsRouter.put('/:pid',async(req,res)=> {
    try{
        let pid = req.params.pid
        let productToUpdate = req.body;
        await pm.updateProduct(pid,productToUpdate);
        res.status(400).send({status:"success",message:"producto actualizado"})
    }
    catch(error){
        console.log("error al agregar producto",error);
        res.status(500).json({ error: "Error para actualizar el producto" });
    }
})
//------------ DELETE ------------
productsRouter.delete('/:pid',async (req,res) => {
    try{
        let pid = req.params.pid;
        pid = parseInt(pid)

        if(pid && !isNaN(pid)){        
            await pm.deleteProduct(pid)
            res.status(400).send({status:"success",message:"producto ELIMINADO"})
        } else {res.status(404).json({ error: "Producto no encontrado" })};
    }
    catch(error){
        console.log("error al BORRAR producto",error);
        res.status(500).json({ error: "Error para eliminar el producto" });
    }
})


export { productsRouter };