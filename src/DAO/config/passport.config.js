import passport from "passport"
import local from "passport-local"
import { createHash,isValidPassword } from "../../utils.js"
import { UserModel } from "../Mongo/Models/User.model.js"
import GitHubStrategy from "passport-github2";


const localStrategy = local.Strategy

const initializePassport = () => {

    //Estrategia local para el registro
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
//Estrategia de github para el login
    passport.use("github",new GitHubStrategy(
        {
            clientID:"Iv1.8406d778947f784",
            clientSecret:"77ecbb5c42d07bd02638ad604bacc4dbf868afdb",
            callbackURL:"http://localhost:7070/api/session/githubcallback"
        },async(accessToken,refreshToken,profile,done) => {
            try{
                console.log(profile)
                const user = await UserModel.findOne({email:profile.__json.email})
                if(!user){
                    const newUser = {
                        name: profile.__json.name,
                        lastName:"",
                        email:profile.__json.email,
                        age:"18",
                        password:"",
                    }

                    let createdUser = await UserModel.create(newUser)
                    done(null,createdUser)

                } else{
                    done(null,user)
                }
                } catch (error) {
                    return done(null,false,{message:"Error en el login de github: " + $error}
                 )
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