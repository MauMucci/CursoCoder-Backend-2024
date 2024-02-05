import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {productsRouter} from './routes/products.router.js';
import {cartsRouter} from './routes/carts.router.js'
import path from 'path'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import {viewsRouter} from './routes/views.router.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express() //la variable app contiene todas las funcionalidades de express
const PORT = 7070;
const httpServer = app.listen(PORT,()=>console.log(`Servidor escuchando desde puerto ${PORT}`))

//Middlewares
app.use(express.json()) //El servidor podra recibir jsons en la request
app.use(express.urlencoded({extended:true}))//permite que se pueda enviar informacion desde la url. 
app.use(express.static(__dirname + "/views")) //seteamos de manera statica la carpeta /views

//Routes
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)
app.use('/',viewsRouter)

//configuracion Handlebars
app.engine("handlebars", handlebars.engine()) //le dice a Express de usar Handlebars como motor de plantillas
app.set("views", __dirname + "/views") //le indicamos que use los archivos de la carpeta views
app.set("view engine", "handlebars") // establece handlebars como el motor de vistas predeterminado

//Connexion con socket.io
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log("Nueva conexion");

    socket.on('saludo', data => {
        console.log("Mensaje recibido desde el cliente",data);
    });

    socket.on('message',d => {
        console.log(d)
    })
});

