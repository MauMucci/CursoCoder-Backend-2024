import mongoose from "mongoose";

const UserCollection = "users"

const UserSchema = new mongoose.Schema({
    name:String,
    lastname: String,
    email: String,
    age: Number,
    password: String,
})

const UserModel = mongoose.model(UserCollection,UserSchema)

export default UserModel