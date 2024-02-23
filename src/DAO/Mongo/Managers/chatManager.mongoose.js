import chatModel from "../Models/Chat.model.js";

export class ChatManagerMongoose {

    saveMessage = async (email,message) =>{
        try {
            const newMessage = chatModel({
                email: email,
                message: message,
                postTime: new Date()
            })
            await newMessage.save()
            console.log("Mensaje guardado en la bdd", newMessage)
            return newMessage

            }
        catch (error) {
            console.log("error al guardar el mensaje",error)
            
        }
    }
}