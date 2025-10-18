import prismadata from "@/app/api/utils/prismadata";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest,context:{params:{id:string} | Promise<{id:string}>}){
    const params = await context.params
    const {id} =  params
    try {
 
        const {tasks} = await prismadata()
        const userTasks = await tasks.findMany({where:{authorId:Number(id)}})
        return NextResponse.json(userTasks,{status:200})
    } catch (error) {
        return NextResponse.json({error:`there is error with user task ${error}`},{status:500})
    }

}



