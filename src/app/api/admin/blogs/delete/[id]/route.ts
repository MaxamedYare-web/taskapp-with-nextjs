import prismadata from "@/app/api/utils/prismadata"
import { NextRequest, NextResponse } from "next/server"


interface IdelBlog{
    params:{id:string}
}

export async function DELETE(_req:NextRequest,{params}:IdelBlog){
const {id} = await params

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




