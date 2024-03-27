import passport from "passport"
import local from "passport-local"
import { createHash,isValidPassword } from "../../utils.js"
import { UserModel } from "../Mongo/Models/User.model.js"
import GitHubStrategy from "passport-github2";
import jwt, { ExtractJwt } from 'passport-jwt'


const localStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {

//ESTRATEGIA LOCAL PARA EL REGISTRO
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
    
//ESTRATEGIA DE GITHUB PARA EL LOGIN

    passport.use("github",new GitHubStrategy(
        {
            clientID: 'Iv1.6644db8d9040d376',
            clientSecret: '7d959ec010e265ef07076b2df1d96601ed7d81a6',
            callbackURL: "http://localhost:7070/api/session/githubcallback"
        },async(accessToken,refreshToken,profile,done) => {
            try{
                console.log(profile)
                const user = await UserModel.findOne({email:profile._json.email})
                if(!user){
                    const newUser = {
                        name: profile._json.name,
                        lastName:"",
                        email:profile._json.email,
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
    

//ESTRATEGIA CON JWT PARA EL LOGIN

    const cookieExtractor = (req,res) => {
        let token = null
        if(req && req.cookies) {
            token = req.cookies("cookieToken")
        }
        return token
    }

    passport.use("jwt",new JWTStrategy(
        {
            jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey:"MySecretKey"
        },async (jwt_payload,done) => {
            try{
                return done(null,jwt_payload)
            } catch (error) {
                return done(error)
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