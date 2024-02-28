import { Router } from "express"
import { ProductManagerMongoose } from "../DAO/Mongo/Managers/productManager.mongoose.js";

const productsRouterMongoose = Router()
const productManagerMongoose = new ProductManagerMongoose()

// ---------- GET -----------
productsRouterMongoose.get('/api/products', async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query; // Obtener los parámetros de la URL
        const productsData = await productManagerMongoose.getProductsAsync({ limit, page, sort, query });

        res.send({ result: "success", payload: productsData });

    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ result: "error", message: "Error al obtener productos" });
    }
});

//Retorno el producto segun su id
productsRouterMongoose.get('/api/products/:pid',async (req,res) => {
    try{
        let {pid} = req.params
        let product = await productManagerMongoose.getProductByIdAsync(pid)

        res.send({result: "success",payload: product})
    }
    catch (error) {
        console.error("Error al obtener el producto: ", pid);
        res.status(500).json({ result: "error", message: "Error al obtener productos" });
    }
})

//POST
productsRouterMongoose.post('/api/products',async(req,res) => {
    let {title,description,thumbnail,code,stock,price,status} = req.body
 
   const newProduct = await productManagerMongoose.addProductAsync({title,description,thumbnail,code,stock,price,status})
    res.send({products: "success",payload:newProduct})
})

//PUT
productsRouterMongoose.put('/api/products/:pid',async(req,res) => {
    let {pid} = req.params
    let productToReplace = req.body

    const productUpdated = await productManagerMongoose.updateProductAsync(pid,productToReplace)
    res.send({productUpdated:"success", payload: productUpdated})
})

//DELETE
productsRouterMongoose.delete('/api/products/:pid',async(req,res)=> {
    let {pid} = req.params
    console.log("HOLA")
    let productToDelete = await productManagerMongoose.deleteProductAsync(pid)
    res.send({productToDelete:"success",payload: productToDelete})
})



// Ruta de lista paginada de todos los productos disponibles
productsRouterMongoose.get('/products', async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;
        const productManagerMongoose = new ProductManagerMongoose();
        const { payload, totalPages, hasPrevPage, hasNextPage, prevLink, nextLink } = await productManagerMongoose.getProductsAsync({ limit, page, sort, query });

        res.render('products', { products: payload, totalPages, hasPrevPage, hasNextPage, prevLink, nextLink, page });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Ruta para la vista detallada de un producto
productsRouterMongoose.get('/products/:pid', async (req, res) => {
    try {
        const productManagerMongoose = new ProductManagerMongoose();
        const {pid} = req.params;
        const product = await productManagerMongoose.getProductByIdAsync(pid);

        //console.log(product.title)

        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }

        res.render('productDetail', { product });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

//VISTAS DETALLADAS 
// Ruta para agregar un producto al carrito directamente desde la vista principal
productsRouterMongoose.post('/products/:productId/add-to-cart', async (req, res) => {
    try {
        const productManagerMongoose = new ProductManagerMongoose();
        const cartManagerMongoose = new CartManagerMongoose();
        const productId = req.params.productId;

        // Aquí podrías agregar el producto al carrito
        // ...
        res.send("Producto agregado al carrito exitosamente");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});










export default productsRouterMongoose