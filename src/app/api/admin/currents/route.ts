import { NextRequest, NextResponse } from "next/server";
import prismadata from "../../utils/prismadata";


export async function GET(_req:NextRequest){


try {

    const {allCurrents} = await prismadata()
    const currents = await allCurrents.findMany()
    return NextResponse.json({success:true,currents})
    
} catch (error) {
    return NextResponse.json({success:false,error:`there is error with geting currents ${(error as Error).message}`})
}


}






