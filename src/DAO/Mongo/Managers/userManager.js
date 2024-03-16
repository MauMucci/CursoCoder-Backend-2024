import {UserModel} from "../Models/User.model.js";
import bcrypt from 'bcrypt'

export default class UserManager {

    createUserAsync = async ({name,lastName,email,age,password}) => {
        try {

            const hashedPassword = await bcrypt.hash(password,10)

            const newUser = await UserModel.create({
                name,
                lastName,
                email,
                age,
                password:hashedPassword
            })
            console.log(newUser)
            
            return newUser

        } catch (error) {
            console.error('Error al crear el usuario:', error);
            throw error;
        }
    }

   getUserByEmailAsync = async (email) => {
    try {
        const user = await UserModel.findOne({email})
        return user.toObject()
        
    } catch (error) {
        
    }
   }
}
