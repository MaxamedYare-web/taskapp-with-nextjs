import * as JWT from "jsonwebtoken"

const jwt_secret = process.env.JWT_SECRET as string
 const generateToken = (userId:string):string=>{
 const token = JWT.sign({id:userId},jwt_secret,{
    expiresIn:"7d"
 })
 return token
}
export default generateToken
