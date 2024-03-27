import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import passport from "passport";

//Variables para obtener el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Declaro funciones independientes
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);


//Genero el Token
const PRIVATE_KEY = "MySecretKey"

export const generateToken = (user) => {
  const token = jwt.sign(user,PRIVATE_KEY,{expiresIn:'24h'})
  console.log("Token: ",token)
  return token
} 


export const passportCall = (strategy) => {
  return async (req,res,next) => {
    passport.authenticate(strategy,function (err,user,info){
      if(err) return next(err)
      if(!user){
        return res.status(401).send({error: info.message ? info.message : info.toString()})
      }

      req.user = user
      next()
    })(req,res,next)
  }
}



export default __dirname;