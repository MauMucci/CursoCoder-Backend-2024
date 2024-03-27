import express from 'express';
import { ProductManagerMongoose } from '../DAO/Mongo/Managers/productManager.mongoose.js';
import { requireAuth } from '../DAO/Mongo/Managers/authManager.js';

const viewsRouter = express.Router();

//Ruta para el login
viewsRouter.get('/login', async (req, res) => {
    res.render('login');
});

// Ruta para la página de inicio
viewsRouter.get('/home', requireAuth, async (req, res) => {
    try {
        // Verificar si el usuario está autenticado
        if (!req.session.user) {
            return res.redirect("/login"); // Si no está autenticado, redirige a la página de inicio de sesión
        } else {
            // Si el usuario está autenticado, renderiza la página de inicio
            const productManagerMongoose = new ProductManagerMongoose();
            const { limit, page, sort, query } = req.query;
            const { payload: filteredProducts } = await productManagerMongoose.getProductsAsync({ limit, page, sort, query });

            res.render('home', { products: filteredProducts });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Ruta para la página de productos en tiempo real
viewsRouter.get('/realTimeProducts', requireAuth, async (req, res) => {
    try {
        // Verificar si el usuario está autenticado
        if (!req.session.user) {
            return res.redirect("/login"); // Si no está autenticado, redirige a la página de inicio de sesión
        } else {
            // Si el usuario está autenticado, renderiza la página de productos en tiempo real
            const pm = new ProductManager("./files/products.json")
            const products = await pm.getProductsAsync()

            res.render('realTimeProducts', { products });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Ruta para la página de perfil
viewsRouter.get('/profile', requireAuth, async (req, res) => {
    try {
        // Verificar si el usuario está autenticado
        if (!req.session.user) {
            return res.redirect("/login"); // Si no está autenticado, redirige a la página de inicio de sesión
        } else {
            // Si el usuario está autenticado, renderiza la página de perfil
            res.render('profile', { user: req.session.user });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

//Ruta para mostrar los products en una lista
viewsRouter.get('/productsList', requireAuth, async (req, res) => {
    try {
        // Verificar si el usuario está autenticado
        if (!req.session.user) {
            return res.redirect("/login"); // Si no está autenticado, redirige a la página de inicio de sesión
        } else {
            // Si el usuario está autenticado, renderiza la página de perfil
            const productManagerMongoose = new ProductManagerMongoose();
            const {payload: products} = await productManagerMongoose.getProductsAsync()
            res.render('productsList',{products} );
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


export { viewsRouter };
