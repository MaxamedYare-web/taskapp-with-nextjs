import prismadata from "@/app/api/utils/prismadata";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(req:NextRequest){

    const {id,avator} = await req.json()

    try {
          if(!id || !avator){
                return NextResponse.json({error:"there is error please try to upload image again"},{status:401})
          }
         const {user} = await prismadata()
         const updateProfile = await user.update({where:{id:Number(id)},data:{avator:String(avator)}})
         if(!updateProfile){
            return NextResponse.json({error:"failed with update please try againg"},{status:401})
         }
       
        return NextResponse.json({message:"Successfully you profile image was updated"})
        
    } catch (error) {
        return NextResponse.json({error:`updated with profile image was failed ${(error as Error).message}`})
    }

}





