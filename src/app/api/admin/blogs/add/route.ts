import prismadata from "@/app/api/utils/prismadata"
import { NextRequest, NextResponse } from "next/server"

type cat = "devlopment" | "crypto" | "learn" | "motivication"
type pub =  "published" | "draft"
interface Iblogs {
    titile:string,
    description:string,
    category:cat,
    avator:string
    published:pub
}
export  async function POST(req:NextRequest){

const {titile,description,category,avator,published}:Iblogs = await req.json()



try {
if(!titile || !description || !category || !avator){
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
    published
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


