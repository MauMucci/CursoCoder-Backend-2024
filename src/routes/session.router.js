import { Router } from "express"
import UserManager  from "../DAO/Mongo/Managers/userManager.js";

const sessionRouter = Router()
const userManager = new UserManager()

sessionRouter.get('/api/session/register',async(req,res) => {
    res.render('register')
})




sessionRouter.post('/api/session/register',async (req,res) => {
    try {
        // if(!req.session?.user){
        //     return res.redirect("/login")
        // }

        let {firstName,lastName,age,email,password} = req.body
        const newUser = await userManager.createUserAsync({firstName,lastName,age,email,password} )

        res.send({ result: "success", payload: newUser });

    } catch (error) {
        console.error("Error:", error);
    }
})


export default sessionRouter