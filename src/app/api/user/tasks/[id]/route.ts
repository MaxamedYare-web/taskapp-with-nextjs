import prismadata from "@/app/api/utils/prismadata";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{params}:{params:Promise<{id:number}>}){
  const {title,description,status} = await req.json()
try {
      const {id} = await params
    if(!title && !description && !status){
        return NextResponse.json({error:"All input is required please fill"},{status:401})
    }

    const {tasks} = await prismadata()
    const updateTask = await tasks.update({where:{id:Number(id)},data:{title:title,
        description:description,status:status,updatedAt:new Date().toISOString()}})
   if(updateTask){
    return NextResponse.json({success:true,message:"Successfully this task was updated"})
   }

} catch (error) {
    console.log("error is:",error)
    return NextResponse.json(error,{status:500})
}

}



