import passport from "passport"
import local from "passport-local"
import { createHash,isValidPassword } from "../../utils.js"
import { UserModel } from "../Mongo/Models/User.model.js"

//utilizamos la estrategia local para el registro
const localStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register',new localStrategy(
        {
            passReqToCallback:true,usernameField:"email"},async (req,username,password,done) => { 
            //passReqToCallback permite que se pueda acceder al objeto req como cualquier otro middleware
            const {name,lastName,email,age} = req.body
            try{
                let user = await UserModel.findOne({email:username})

                if(user){

                    console.log('Usuario existente')
                    return done (null,false)
                }

                const newUser = {
                    name,
                    lastName,
                    email,
                    age,
                    password:createHash(password)
                }

                let result = await UserModel.create(newUser)
                return done(null,result)

            }catch(error) {
                return done(`error al obtener el usuario ${error}`)
            }
        }
    ))

    passport.serializeUser((user,done) => {
        done(null,user._id)
    })

    passport.deserializeUser(async (id,done)=>{
        let user = await UserModel.findById(id)
        done(null,user)
    })
}

export default initializePassport