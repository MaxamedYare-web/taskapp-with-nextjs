import { NextResponse } from "next/server";
import prismadata from "../utils/prismadata";
import { headers } from "next/headers";



export async function GET(){
    try {
        const userId = (await headers()).get("userDataId")
        const {user,tasks} = await prismadata()
        const adminData = await user.findUnique({where:{id:Number(userId)},omit:{password:true,id:true}})
        const users = await user.findMany({omit:{password:true}})
        const tasksData = await tasks.findMany()
        const usersData = {
            users,
            tasksData,
            adminData
        }
        return NextResponse.json(usersData)
    } catch (error) {
        return NextResponse.json(error,{status:400})
    }
}








