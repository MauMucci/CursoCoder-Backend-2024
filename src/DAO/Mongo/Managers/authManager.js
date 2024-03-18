import { UserModel } from "../Models/User.model.js"
import { isValidPassword } from "../../../utils.js"
//**En este archivo uso funciones independientes  */

export const requireAuth = (req,res,next) => {
    if(!req.session.user) {
        //Si no esta autenticado, se redirige a login
        return res.redirect('/login')
    }
    //Si sí esta autenticado, continua con la solicitud
    next()
}

export const redirectToHomeIfAuthenticated = (req,res,next) => {
    if(req.session.user){
        //Si sí esta atutenticado, redirige a Home
        return res.redirect('/home')
    }
    //Si no esta autenticado, continua con la solicitud
    next()
}


export const login = async (email, password) => {

    let user 

    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {

        user = {
            name: "Coder",
            lastname:"House",
            email:"adminCoder@coder.com",
            role:"admin",
            admin:true
        }
    }

    else {

        user = await UserModel.findOne({email})

        if(!user){
            throw new Error("Usuario no encontrado");
        }
       
        const passwordMatch = isValidPassword(user,password)

        if(!passwordMatch){
            throw new Error("Contraseña incorrecta")
        }
        
    }

    console.log(user)
    return user
}

