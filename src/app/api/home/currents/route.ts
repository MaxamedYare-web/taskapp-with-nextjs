import { NextRequest, NextResponse } from "next/server";
import prismadata from "../../utils/prismadata";


export async function GET(_req:NextRequest){
try {
    const {allCurrents} = await prismadata()
    const currents = await allCurrents.findMany({where:{active:true}})
    return NextResponse.json({success:true,currents})
} catch (error) {
    return NextResponse.json({error:`there is error with getting currents ${(error as Error).message}`})
}


}




