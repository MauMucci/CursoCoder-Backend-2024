import {UserModel} from "../Models/User.model.js";


export default class UserManager {

    createUserAsync = async ({name,lastName,email,age,password}) => {
        try {

            const newUser = await UserModel.create({name,lastName,email,age,password})
            console.log(newUser)
            return newUser

        } catch (error) {'Error al crear el usuario', error}
        throw error;
    }

   getUserByEmailAsync = async (email) => {
    try {
        const user = await UserModel.findOne({email})
        return user
        
    } catch (error) {
        
    }
   }
}
