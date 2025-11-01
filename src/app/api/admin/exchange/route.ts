import { NextRequest, NextResponse } from "next/server";
import prismadata from "../../utils/prismadata";


export async function GET(_req:NextRequest){

    try {
        const {exhangeUser} = await prismadata()
        const listExchnage = await exhangeUser.findMany()
        return NextResponse.json({success:true,listExchnage})
        
    } catch (error) {
        return NextResponse.json({success:false,error:`there is error with getting exchange list ${(error as Error).message}`})
    }

}




