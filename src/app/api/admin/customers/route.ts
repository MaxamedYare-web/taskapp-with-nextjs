import { NextResponse } from "next/server";
import prismadata from "../../utils/prismadata";


export async function GET(){
    try {
        const {user} = await prismadata()
        const users = await user.findMany({omit:{password:true}})
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json(error,{status:400})
    }
}








