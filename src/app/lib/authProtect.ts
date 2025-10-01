import JWT from "jsonwebtoken"
import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server"



interface IpropToken {
   id:string
}

export async function AuthProtect(req:any):Promise<boolean>{
 const token = req.cookies.get("userToken")
   try {
       if(!token){
      return false
   }
       const JWT_SECRET = process.env.JWT_SECRET as string
    const tokenID = JWT.verify(token.value,JWT_SECRET)
    const decoded = (tokenID as IpropToken).id
    return true
   } catch (error) {
    console.log(`failed you token expired or not found please try to login ${(error as Error).message}`)
    return false
   }

}


