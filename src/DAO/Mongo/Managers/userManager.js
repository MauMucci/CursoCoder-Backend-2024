import UserModel from "../Models/User.model.js";


export default class UserManager {

    createUserAsync = async ({name,lastname,email,age,password}) => {
        try {

            const newUser = await UserModel.create({name,lastname,email,age,password})
            console.log(newUser)

            return newUser

        } catch (error) {'Error al crear el usuario', error}
        throw error;
    }

    // checkIfUserExist = async ({emai,password}) => {
    //     const {emai,password} = req.body
    //     const user = await UserModel.findOne({email,password})
    //     if(user){
    //         req.session.user = user
    //         res.redirect('/profile'); // Redirigir a la página de perfil
    //     }
    //     else{
    //         res.render('login', { error: 'Usuario o contraseña incorrectos' });
    //     }
    // }
}
