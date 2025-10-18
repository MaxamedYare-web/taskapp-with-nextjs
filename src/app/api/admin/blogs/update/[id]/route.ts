import prismadata from "@/app/api/utils/prismadata";
import { NextRequest, NextResponse } from "next/server";


interface IupdateBlogApi {
    params:{id:string}
}

type cat = "devlopment" | "crypto" | "learn" | "motivication"
type pub =  "published" | "draft"
interface Iblogs {
    titile:string,
    description:string,
    category:cat,
    avator:string
    published:pub,
     delet_url_hash:string
}

export async function PUT(req:NextRequest,context:{params:{id:string} | Promise<{id:string}>}){

const {titile, description,published, avator,category,delet_url_hash}:Iblogs = await req.json()
const params = await context.params
const {id} =  params

try {

    const dataBlog ={
        titile,
        description,
        updatedAt:new Date().toISOString(),
        published,
        avator,
        category,
        delet_url_hash
    }

   const {blogs} = await prismadata()
   const update = await blogs.update({where:{id:Number(id)},data:dataBlog})
   if(!update){
    return NextResponse.json({error:"failed update not success please contact you devloper"})
   }

    return NextResponse.json({message:`successfully this blog id ${update.id} was updated`})
    
} catch (error) {
    return NextResponse.json({error:`there is error with update: ${(error as Error).name }`})
}


}


