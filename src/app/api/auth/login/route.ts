import { NextRequest, NextResponse } from "next/server";
import prismadata from "../../utils/prismadata";
import generateToken from "../../utils/generatetoken";
import * as bcrypt from 'bcrypt';



export async function POST(req:NextRequest){
    let {username,password}  = await req.json()
    try {
      
        if(!username){
            return NextResponse.json({error:"Username is required please fill"},{status:400})
        }
        if(!password){
            return NextResponse.json({error:"Password is required please fill"},{status:400})
        }

        const {user} = await prismadata()
        const extisUser = await user.findFirst({where:{OR:[
            {username:username},
            {email:username}
        ]}})

     const checkPassword = await bcrypt.compare(password,String(extisUser?.password))
      if(!extisUser){
     return NextResponse.json({error:"username or email not found"})
    }
     if(!checkPassword){
        return NextResponse.json({error:"Password is error please try again"})
     }
    const token = generateToken(String(extisUser.id))
      return NextResponse.json({success:true,message:"successfully logged",token:token})  
    } catch (error) {
        return NextResponse.json({error:`Network error please check you internet`},{status:400})
    }
}


