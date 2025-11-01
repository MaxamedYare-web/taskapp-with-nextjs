import prismadata from "@/app/api/utils/prismadata";
import { NextRequest, NextResponse } from "next/server";

interface IsEx {
   statusEx:IstatusEx 
}
type IstatusEx = "waiting" | "complated" | "rejected" | "refund"

export  async function PUT(req:NextRequest,context:{params:{id:string}| Promise<{id:string}>}){
const {statusEx}:IsEx = await req.json()
const params = await context.params
const {id} = params
 
 console.log("status",statusEx)
try {

    const {exhangeUser} = await prismadata()
    const updateStaus = await exhangeUser.update({where:{id:Number(id)},data:{status:statusEx}})

    return NextResponse.json({success:true,updateStaus})
} catch (error) {
    return NextResponse.json({success:false,error:`error with update current status: ${(error as Error).message}`})
}


}




