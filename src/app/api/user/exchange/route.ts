import { NextRequest, NextResponse } from "next/server";
import prismadata from "../../utils/prismadata";


export async function GET(req:NextRequest){

    try {

        const {exhangeUser} = await prismadata()
        const exchangsUser = await exhangeUser.findMany()
        return NextResponse.json({success:true,exchangsUser})
        
    } catch (error) {
        return NextResponse.json({success:false,error:`there is error with get current exchange ${(error as Error).message}`},{status:500})
    }
}








