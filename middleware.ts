
import  cookiess  from "js-cookie"
import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"


export async function middleware(req:NextRequest){

    const authToken = (await headers()).get("authorization")?.split(" ")[1]
    if(!authToken){
        return NextResponse.json({error:"auth token not found please try to login again"},{status:500})
    }

const getUserToken =  (await cookies()).get("userToken")
console.log("tokenka front end getUser waa kani:",getUserToken)
const pathNameUrl = req.nextUrl.pathname
console.log("pathname waa midkan from frrontend",pathNameUrl)

}

export const config = {
    matcher:["/dashboard:path*","/api/user:path*","/api/admin:path*"]
}
