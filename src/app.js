import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {productsRouter} from './routes/products.router.js';
import {cartsRouter} from './routes/carts.router.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import {viewsRouter} from './routes/views.router.js'
import mongoose from 'mongoose';
import { ProductManager } from './DAO/FileSystem/Manager/ProductManager.js';
import productsRouterMongoose from './routes/products.router.mongoose.js';
import cartRouterMongoose from './routes/carts.router.mongoose.js';
import chatRouter from './routes/chat.router.mongoose.js';
import { chatModel } from './DAO/Mongo/Models/Chat.model.js';


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express() //la variable app contiene todas las funcionalidades de express
const PORT = 7070;
const httpServer = app.listen(PORT,()=>console.log(`Servidor escuchando desde puerto ${PORT}`))

//Middlewares
app.use(express.json()) //El servidor podra recibir jsons en la request
app.use(express.urlencoded({extended:true}))//permite que se pueda enviar informacion desde la url. 
app.use(express.static(__dirname + "/public")) //seteamos de manera statica la carpeta /public

//Routes con FileSystem
 app.use('/api/products',productsRouter)
 app.use('/api/carts',cartsRouter)
 app.use('/',viewsRouter)

//configuracion Handlebars
app.engine("handlebars", handlebars.engine()) //le dice a Express de usar Handlebars como motor de plantillas
app.set("views", __dirname + "/views") //le indicamos que use los archivos de la carpeta views
app.set("view engine", "handlebars") // establece handlebars como el motor de vistas predeterminado

//Connexion con socket.io
const socketServer = new Server(httpServer);

const mongoUrl = "mongodb+srv://maumucci91:Mong834531@cluster0.yt2tfds.mongodb.net/ecommerce?retryWrites=true&w=majority"

//Mongo
mongoose.connect(mongoUrl)
.then(() => {
    console.log("CONECTADO A LA BASE DE DATOS")
})
.catch(error => {
    console.log("ERROR AL CONECTARSE A LA BASE DE DATOS")
    console.log(error)
})


//Routes con Mongoose
app.use("/api/products",productsRouterMongoose)
app.use("/api/carts",cartRouterMongoose)
app.use("/",chatRouter)

//instanciamos ProductManager
const pm = new ProductManager("./files/products.json")

//
socketServer.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");
    
    //Evento para agregar productos
    socket.on("addProduct", async product => {  
        await pm.addProductsAsync(product);
        const products = await pm.getProductsAsync(); 
        socketServer.emit('updateProducts', products);
    });

    //Evento para borrar productos
    socket.on('deleteProduct',async productId => {
        await pm.deleteProduct(productId)
        const products = await pm.getProductsAsync()
        socketServer.emit('updateProducts',products)
    })

    //Conexion con Mongo
    socket.on ('message',async (data) => {
        try{
            //guarda los mensaje en la bdd
            await chatModel.create({email: data.email, message: data.message})
            const messages = await chatModel.find()
            socketServer.emit('messageLogs',messages)

        }
        catch(error){
            console.log('Error guardando en la base de datos')
        }
    })
});



