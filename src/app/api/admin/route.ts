import { NextResponse } from "next/server";
import prismadata from "../utils/prismadata";
import { headers } from "next/headers";



export async function GET(){
    try {
        const userId = (await headers()).get("userDataId")
        const {user,allCurrents} = await prismadata()
        const adminData = await user.findUnique({where:{id:Number(userId)},omit:{password:true,banned:true}})
        const users = await user.findMany({omit:{password:true}})
        const currents = await allCurrents.findMany()
        const usersData = {
            users,
            currents,
            adminData
        }
        return NextResponse.json(usersData)
    } catch (error) {
        return NextResponse.json(error,{status:400})
    }
}








