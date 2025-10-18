import prismadata from "@/app/api/utils/prismadata";
import { NextRequest, NextResponse } from "next/server";
import bcrypto from "bcrypt"

export async function PUT(req:NextRequest){

let {id,newPassword,oldPassword} = await req.json()


try {
    if(!id || !newPassword || !oldPassword ){
        return NextResponse.json({error:"all input is required please fill"},{status:401})
    }

     const {user} = await prismadata()
      const userUp = await user.findUnique({where:{id:Number(id)}})
     const checkPassword = bcrypto.compareSync(oldPassword,String(userUp?.password))
     if(!checkPassword){
        return NextResponse.json({error:"you old password is wrong please try again"},{status:401})
     }

     const salt = bcrypto.genSaltSync(10)
     newPassword = bcrypto.hashSync(newPassword,salt)
     const changePassword = await user.update({where:{id:Number(id)},data:{password:newPassword}})
     if(!changePassword){
        return NextResponse.json({error:"failed error with change password try again"},{status:401})
     }

     return NextResponse.json({success:true,message:"You Password was changed successfully"})
    
} catch (error) {
    return NextResponse.json({error:`There is error with change password ${(error as Error).message}`})
}


}











