import prismadata from "@/app/api/utils/prismadata"
import { NextRequest, NextResponse } from "next/server"

type cat = "devlopment" | "crypto" | "learn" | "motivication"
type pub =  "published" | "draft"
interface Iblogs {
    titile:string,
    description:string,
    category:cat,
    avator:string,
    published:pub,
     delet_url_hash:string
}
export  async function POST(req:NextRequest){

const {titile,description,category,avator,published, delet_url_hash}:Iblogs = await req.json()



try {
if(!titile || !description || !category || !avator || !delet_url_hash){
    return NextResponse.json({error:"All input is required"},{status:401})
}
    const {user,blogs} = await prismadata()
    const admin  = await user.findFirst({where:{role:"Admin"}})

const data  = {
    titile,
    description,
    category,
    avator,
    createdAt: new Date().toISOString(),
    authorId: Number(admin?.id),
    published:published,
    delet_url_hash
}

    const addBlog  = await blogs.create({data:data})
    if(!addBlog){
        return NextResponse.json({error:"failed with create blogs"})
    }

    return NextResponse.json({success:true,addBlog})

    
} catch (error) {
    return NextResponse.json(error,{status:500})
}
  
    
}


