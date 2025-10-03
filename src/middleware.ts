import JWT from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import prismadata from "./app/api/utils/prismadata";
import { cookies } from "next/headers";


interface IpropTok{
    id:string
}

export const runtime = "nodejs"
export async function middleware(req:NextRequest){
    const pathname = req.nextUrl.pathname
    console.log("pathname ka waa midkaan:",pathname)
const authToken = req.headers.get("authorization")?.split(" ")[1]
if(pathname.startsWith("/api/user") || pathname.startsWith("/api/admin")){
    try {
    if(!authToken){
        return NextResponse.json({error:"token not found please try to login again"},{status:401})
    }

    const decoded = JWT.verify(authToken,String(process.env.JWT_SECRET))
    const reqHeaders = new Headers(req.headers)
    const userId = (decoded as IpropTok).id
    const user = await (await prismadata()).user.findUnique({where:{id:Number(userId)}})
     reqHeaders.set("userDataId",userId)
     if(pathname.startsWith("/api/admin") &&  user?.role !== "Admin"){
        return NextResponse.json({success:false,error:"failed you are not admin, only allowed admim"},{status:401})
     }
    return NextResponse.next({
        request:{
            headers:reqHeaders
        }
    })
} catch (error) {
    return NextResponse.json({error:`there is error goood ${error}`})
}
}

const token = (await cookies()).get("userToken")
if(!token && pathname.startsWith("/admin") || pathname.startsWith("/dashboard")){
  return NextResponse.redirect(new URL("/auth/login",req.url))
}

}

export const config = {
    matcher:[
        "/api/user:path*",
        "/api/admin:path*",
        "/admin:path*",
        "/dashboard:path*"
    ]
}