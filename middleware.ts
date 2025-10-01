
import { AuthProtect } from "@/app/lib/authProtect"
import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export async function middleware(req:NextRequest){
const isAuthenticate = await AuthProtect(req)
console.log("diiwan galinta waa midkan:",isAuthenticate)

const pathname = req.nextUrl.pathname
const reqUser = req.headers.get("authorization")?.split(" ")[1]

if(!reqUser && pathname.startsWith("/api/user") || pathname.startsWith("/api/admin")){
    return NextResponse.json({error:"Bearer token not found"},{status:401})
}

}



export const config = {
    matcher:["/dashboard:path*","/api/user:path*","/api/admin:path*"]
}
