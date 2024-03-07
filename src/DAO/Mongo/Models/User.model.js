import mongoose from "mongoose";

const usersCollection = "usersColleciont";

const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    age: Number,
    password: String,
});

 export const UserModel = mongoose.model('User', userSchema);

