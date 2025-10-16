import { NextRequest, NextResponse } from "next/server";
import prismadata from "../../utils/prismadata";




export async function PUT(req:NextRequest){
    const {id,avator}:{id:number,avator:string} = await req.json()
    try {
        const {user} = await prismadata()
        const avatorUpdate = await user.update({where:{id:Number(id)},data:{avator:String(avator)}})
        if(!avatorUpdate){
            return NextResponse.json({error:"failed with update image please try again"},{status:401})
        }
    
        return NextResponse.json({message:"Successfully you profile image was updated"})
    
    } catch (error) {
        return NextResponse.json({error:`there is error with updating avator: ${(error as Error).message}`},{status:500})
    }
}








