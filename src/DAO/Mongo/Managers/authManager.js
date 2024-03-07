import { UserModel } from "../Models/User.model.js"


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

    let isAdmin = false
    let user 

    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {

        isAdmin = true
        user = {
            name: "Coder",
            lastName: "House",
            email: "adminCoder@coder.com",
            role:"admin",
            admin: isAdmin,
        }
    }
    else {
        user = await UserModel.findOne({email,password})
    }

    return user
}

