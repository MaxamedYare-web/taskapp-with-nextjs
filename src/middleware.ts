import JWT from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import prismadata from "./app/api/utils/prismadata";
import {  cookies } from "next/headers";


interface IpropTok{
    id:string
}

export const runtime = "nodejs"
export async function middleware(req:NextRequest){
    const pathname = req.nextUrl.pathname
   

    // api route
if(pathname.startsWith("/api/user") || pathname.startsWith("/api/admin")){
   return handleApiRout(req,pathname)
}

// client-side
if(pathname.startsWith("/dashboard") || pathname.startsWith("/admin")){
 return handleClientSide(req,pathname)
}

return NextResponse.next()
}

// api route function
async function handleApiRout (req:NextRequest,pathname:string){
     const token = req.headers.get("authorization")?.split(" ")[1] 
     if(!token){
        return NextResponse.json({success:false,error:"token not found try to login"},{status:401})
     }
 
    try {
   
const decoded = JWT.verify(token,String(process.env.JWT_SECRET)) as IpropTok
    const reqHeaders = new Headers(req.headers)
    const userId = decoded.id
    const user = await (await prismadata()).user.findUnique({where:{id:Number(userId)}})
    if(!user){
        return NextResponse.json({error:"user account not found"},{status:401})
    }
     reqHeaders.set("userDataId",userId)
     if(user?.banned){
        return NextResponse.json({success:false,error:"sorry you account has been suspended due violotion, contact us our support"},{status:400})
     }

// admin route check
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


// client-side function
async function handleClientSide (req:NextRequest,pathname:string){
  

    try {
           
const token = (await cookies()).get("userToken")?.value
 if(!token){
    if(!pathname.startsWith("/auth/login")){
        return NextResponse.redirect(new URL("/auth/login",req.url))
    }
 }

 const decoded = JWT.verify(String(token),String(process.env.JWT_SECRET)) as IpropTok
  const userIdD = decoded.id
  const user = await (await prismadata()).user.findUnique({where:{id:Number(userIdD)}})

if(!token && (pathname.startsWith("/admin") || pathname.startsWith("/dashboard"))){
  return NextResponse.redirect(new URL("/auth/login",req.url))
}

if(token && pathname.startsWith("/auth/register")){
    
    return NextResponse.redirect(new URL("/dashboard",req.url))
}

if(user?.banned && !pathname.startsWith("/dashboard/ban")){
   return NextResponse.redirect(new URL("/dashboard/ban",req.url))
}

 if(!user?.banned && pathname.startsWith("/dashboard/ban")){
    return NextResponse.redirect(new URL("/dashboard",req.url))
 }

    } catch (error) {
        if(!pathname.startsWith("/auth/login")){
            return NextResponse.redirect(new URL("/auth/login",req.url))
        }
         return NextResponse.next()
    }

}



export const config = {
    matcher:[
        "/api/user/:path*",
        "/api/admin/:path*",
        "/admin/:path*",
        "/dashboard/:path*"
    ]
}