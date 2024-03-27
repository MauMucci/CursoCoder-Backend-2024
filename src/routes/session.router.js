import { Router } from "express"
import UserManager  from "../DAO/Mongo/Managers/userManager.js";
import { redirectToHomeIfAuthenticated,login } from "../DAO/Mongo/Managers/authManager.js";
import passport from "passport";
import jwt from "jsonwebtoken"
import { generateToken, passportCall } from "../utils.js";

const sessionRouter = Router()

sessionRouter.get('/api/session/register',redirectToHomeIfAuthenticated,async(req,res) => {
    res.render('register')
})

/*REGISTER TRADICIONAL

// sessionRouter.post('/api/session/register',async (req,res) => {
//     try {
//         let {name,lastName,email,age,password} = req.body
//         const newUser = await userManager.createUserAsync({name,lastName,email,age,password} )

//         // res.send({ result: "success", payload: newUser });
//         res.redirect('/login')

//     } catch (error) {
//         console.error("Error:", error);
//     }
// })



/*REGISTER CON ESTRATEGIA LOCAL*/
sessionRouter.post('/api/session/register',passport.authenticate('register',({failureRedirect:'/failRegister'})) ,async (req,res) => {

    console.log(("Registro fallido"))
    res.redirect('/login')
})

sessionRouter.get('/failRegister',async(req,res) => {
    console.log(("registro fallido"))
    res.send({error:"failed"})
})
//Fin de estrategia


/*LOGIN TRADICIONAL */
// sessionRouter.post('/login',async(req,res) => {
//     try {
//         let {email,password} = req.body
//         const user = await login(email,password) //importo la funcion 'login'

//         req.session.user = user

//         console.log('inicio de sesion correcto');
//         console.log(`usuario: ${user.name}`);

//         //Guardo la informacion del usuario dentro de la sesion del servidor
//         res.render('home',{user: user}); 

//     } catch (error) {
//         console.error('Error al iniciar sesión:', error);
//         res.status(500).send('Error interno del servidor.');
//     }
// })


/*LOGIN CON ESTRATEGIA GITHUB */
sessionRouter.get('/api/session/github',passport.authenticate('github',{scope:["user:email"]}),async(req,res) => {})

sessionRouter.get('/api/session/githubcallback',passport.authenticate('github',{failureRedirect:'/login',failureMessage: true}),async(req,res)=> {
    //La estrategia solo devolvera un usuario, lo agregamos al objeto de la sesion
    req.session.user = req.user
    console.log(req.user)
    res.redirect('/home') 
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


//LOGIN CON JWT
sessionRouter.post('/login',async (req,res) => {
    try {
        let {email,password} = req.body
        const user = await login (email,password)

        const tokenUser = {
            emai: user.email,
            name: user.name
        }

        const token = generateToken(tokenUser)

        res.cookie("cookietoken",token,{
            maxAge:60*60*1000*24,
            httpOnly:true,            
        })
        console.log("adentro de login")
        
        res.render('home',{user: user}); 
         console.log("adentro de login2")

    } catch (error) {
        res.status(500).send({
            statu:"error",
        })
    }
})

sessionRouter.get('/current',passportCall('jwt'),(req,res) => {
    res.send(req.user)
})

export default sessionRouter