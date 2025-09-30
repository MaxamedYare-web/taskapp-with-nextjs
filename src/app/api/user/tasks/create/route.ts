import prismadata from "@/app/api/utils/prismadata";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const {title,description,status} = await req.json()
    try {
        if(!title){
            return NextResponse.json({error:"Title is required please fill"},{status:401})
        }
        if(!description){
            return NextResponse.json({error:"Description is required please fill"},{status:401})
        }
        if(!status){
            return NextResponse.json({error:"Please select status"},{status:401})
        }
        const getCokUser = (await cookies()).get("user")
        const userStor = JSON.parse(getCokUser?.value as string)
    const {user} = await prismadata()
    const taskUser = await user.findUnique({where:{id:Number(userStor.id)}})
    const {tasks} = await prismadata()

      const taskData:Itasks = {
        title ,
        description,
        status,
        authorId:Number(taskUser?.id)
    }
    const create = await tasks.create({data:{title:String(taskData.title),
        status:taskData.status,authorId:Number(taskData.authorId),description:String(taskData.description)}})
        return NextResponse.json({success:true,message:`Successfully task was created Task Title: ${create.title}`})
        
    } catch (error) {
        console.log("erreo is:",error)
        return NextResponse.json(error,{status:500})
    }

}





