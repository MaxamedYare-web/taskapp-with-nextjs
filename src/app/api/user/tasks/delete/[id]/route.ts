import prismadata from "@/app/api/utils/prismadata";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(_req:NextRequest,context:{params:{id:string} | Promise<{id:string}>}){
 const params = await context.params
    const {id} = params
    try {
        const {tasks} = await prismadata()
        const delTask = await tasks.delete({where:{id:Number(id)}})
        if(delTask){
        return NextResponse.json({success:true,message:`Successfully this task was deleted id: ${delTask.id}`})
        }
       
    } catch (error) {
        NextResponse.json(error,{status:400})
    }
    
}

