import { NextRequest, NextResponse } from "next/server";
import JWT from "jsonwebtoken"
import { redirect } from "next/navigation";


interface IpropTok{
    id:string
}

export const runtime = "nodejs"
export async function middleware(req:NextRequest){
    const pathname = req.nextUrl.pathname
    console.log("pathname ka waa midkaan:",pathname)

try {

    const authToken = req.headers.get("authorization")?.split(" ")[1]
   
    if(!authToken){
        return NextResponse.json({error:"token not found please try to login again"},{status:401})
    }

    const decoded = JWT.verify(authToken,String(process.env.JWT_SECRET))
    const reqHeaders = new Headers(req.headers)
    const userId = (decoded as IpropTok).id
     reqHeaders.set("userDataId",userId)
    return NextResponse.next({
        request:{
            headers:reqHeaders
        }
    })
} catch (error) {
    return NextResponse.json({error:`there is error goood ${error}`})
}

}

export const config = {
    matcher:["/api/user:path*"]
}