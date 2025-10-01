
import { AuthProtect } from "@/app/lib/authProtect"
import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import JWT from "jsonwebtoken"

export const runtime = "nodejs"
export async function middleware(req:NextRequest){
const isAuthenticate = await AuthProtect(req)
console.log("diiwan galinta waa midkan:",isAuthenticate)

const pathname = req.nextUrl.pathname
const reqUser = req.headers.get("authorization")?.split(" ")[1]

  const JWT_SECRET = process.env.JWT_SECRET as string
    const tokenID = JWT.verify(String(reqUser),JWT_SECRET)
    const requestHeaders = new Headers(req.headers)
    const testJ  = requestHeaders.set("userDataId",JSON.stringify(tokenID))
console.log("tijaabo bbb",testJ)
   return NextResponse.next({
    request:{
        headers:requestHeaders
    }
   })



}



export const config = {
    matcher:["/dashboard:path*","/api/user:path*","/api/admin:path*"]
}
