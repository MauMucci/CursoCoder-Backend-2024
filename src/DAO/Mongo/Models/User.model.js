import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const usersCollection = "usersColleciont";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },

    lastName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    age:{
        type: Number,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    cart:{
        type: ObjectId,
        ref:"carts" //ref establece una relacion entre dos modelos 
    },
    role:{
        type: String,
        default:'user'
    }

});

 export const UserModel = mongoose.model(usersCollection, userSchema);

