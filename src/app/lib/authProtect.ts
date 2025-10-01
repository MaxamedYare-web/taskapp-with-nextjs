import JWT from "jsonwebtoken"



export async function AuthProtect(req:any):Promise<boolean>{
 const token = req.cookies.get("userToken")
   try {
       if(!token){
      return false
   }

   console.log("iskuday kale token waa:",token.value)
       const JWT_SECRET = process.env.JWT_SECRET as string
    const decoded = JWT.verify(token.value,JWT_SECRET)
    console.log("aqoonsiga waa midkan:",decoded)
    return true
   } catch (error) {
    console.log(`failed you token expired or not found please try to login ${(error as Error).message}`)
    return false
   }

}


