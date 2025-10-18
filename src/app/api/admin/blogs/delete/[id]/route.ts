import prismadata from "@/app/api/utils/prismadata"
import { NextRequest, NextResponse } from "next/server"



export async function DELETE(_req:NextRequest,context:{params:{id:string} | Promise<{id:string}>}){

    const params = await context.params
    const {id} = params



try {

     const {blogs} = await prismadata()
    const delBlog = await blogs.delete({where:{id:Number(id)}})
    if(!delBlog){
        return NextResponse.json({error:"failed delete blog not delete"},{status:401})
    }

    return NextResponse.json({message:`this blog id ${delBlog.id} was deleted successfully`})
    
} catch (error) {
    return NextResponse.json({error:`there is error with delete blog ${(error as Error).message}`},{status:500})
}


}




