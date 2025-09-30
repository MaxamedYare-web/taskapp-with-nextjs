import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as JWT from "jsonwebtoken";
import prismadata from "./app/api/utils/prismadata";

export const runtime = "nodejs";
export async function middleware(req: NextRequest) {
  try {
    const authToken = (await headers()).get("authorization")?.split(" ")[1];
    if (!authToken) {
      return NextResponse.json({ error: "failed token not found" });
    }

   
    const jwtSecret = process.env.JWT_SECRET 
    const decoded =  JWT.verify(authToken, String(jwtSecret));
    const reqheaders = new Headers(req.headers);
    const storecook = (await cookies()).set("user",JSON.stringify(decoded))
    reqheaders.set("userId", JSON.stringify(decoded));
 const idU = Object(decoded).id
 const user = (await prismadata()).user.findUnique({where:{id:Number(idU)}})

    const pathNameUrl = req.nextUrl.pathname
    if(pathNameUrl.startsWith("/api/admin") && (await user)?.role !== "Admin" ){
      return NextResponse.json({sucess:false,error:"failed you are not admin, here only allow admin"})
    }


    return NextResponse.next({
      request: {
        headers: reqheaders,
      },
    });
  } catch (error) {
    console.log("there is error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token please try to login again" },
      { status: 401 }
    );
  }
}
export const config = {
  matcher: ["/api/user:path*", "/api/admin:path*"]
};
