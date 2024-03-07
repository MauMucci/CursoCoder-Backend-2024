import { Router } from "express"
import UserManager  from "../DAO/Mongo/Managers/userManager.js";
import { redirectToHomeIfAuthenticated,login } from "../DAO/Mongo/Managers/authManager.js";

const sessionRouter = Router()
const userManager = new UserManager()

sessionRouter.get('/api/session/register',redirectToHomeIfAuthenticated,async(req,res) => {
    res.render('register')
})

sessionRouter.post('/api/session/register',async (req,res) => {
    try {
        let {name,lastName,email,age,password} = req.body
        const newUser = await userManager.createUserAsync({name,lastName,email,age,password} )

        // res.send({ result: "success", payload: newUser });
        res.redirect('/home')

    } catch (error) {
        console.error("Error:", error);
    }
})

sessionRouter.post('/login',async(req,res) => {
    try {
        let {email,password} = req.body
        const user = await login(email,password) //importo la funcion 'login'

    req.session.user = user

    console.log('inicio de sesion correcto');
    console.log(`usuario: ${user}`);
    console.log(`usuario: ${user.name}`);

    //Guardo la informacion del usuario dentro de la sesion del servidor
    res.render('home',{user: user.toObject()}); //Con el ToObject puedo hacer que muestre el nombre en hbls

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error interno del servidor.');
    }
})

sessionRouter.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar la sesión:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            console.log('Sesión cerrada exitosamente');
            res.redirect('/login'); // Redirigir a la página de inicio de sesión
        }
    })
})

export default sessionRouter