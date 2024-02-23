import mongoose from "mongoose";

const chatCollection = "chat"

const chatSchema = new mongoose.Schema({
    username: {type: String, index: true},
    message : {type: String, index: true }
})

const chatModel = mongoose.model(chatCollection , chatSchema)

export default chatModel