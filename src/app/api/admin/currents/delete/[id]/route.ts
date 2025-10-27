import prismadata from "@/app/api/utils/prismadata";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(_req:NextRequest,context:{params:{id:string} | Promise<{id:string}>}){
    const params= await context.params
    const {id} = params
    console.log("id is",id)
    try {
        
     const {allCurrents} = await prismadata()
     const delCurrent = await allCurrents.delete({where:{id:Number(id)}})
     if(!delCurrent){
       return NextResponse.json({error:"there is error with delete try again"})
     }

     return NextResponse.json({success:true,message:`this current name: ${delCurrent?.current_name} was deleted successfully`})

    } catch (error) {
        return NextResponse.json({error:`there is error with deleting current ${(error as Error).message}`},{status:500})
    }

}

