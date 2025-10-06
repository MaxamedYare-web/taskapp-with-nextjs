import prismadata from "@/app/api/utils/prismadata";
import { NextRequest, NextResponse } from "next/server";

interface IbanUser {
    params:{id:string}
}
export async function PUT(_req:NextRequest,{params}:IbanUser){
    const {id} = await params

  try {

    const {user} = await prismadata()
   const userB = await user.findUnique({where:{id:Number(id)}})
   const isBanned =  userB?.banned
    const banUser = await user.update({where:{id:Number(id)},data:{banned:Boolean(!isBanned)},omit:{password:true,id:true,email:true}})
 return NextResponse.json({success:true,message:"Successfully this user was banned",banUser})
  } catch (error) {
    return NextResponse.json(error)
  }


}




