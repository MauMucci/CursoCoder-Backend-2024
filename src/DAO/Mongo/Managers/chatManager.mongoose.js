import chatModel from "../Models/Chat.model.js"

export class ChatManagerMongoose {

    async getMessages() {
        try {
            let oldMessages = await chatModel.find()
            return oldMessages
        } catch (error) {
            throw error
        }
    }

    async addMessages(data) {
        try {
            await chatModel.create(data)
            if (!data){
                throw "No se pudo crear el mensaje"
            }            
            return 
        } catch (error) {
            throw error
        }
    }

}


export default ChatManagerMongoose
