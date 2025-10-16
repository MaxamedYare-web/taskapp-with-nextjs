import { NextRequest, NextResponse } from "next/server";
import prismadata from "../../utils/prismadata";


export async function  GET(req:NextRequest){


try {

    const {blogs} = await prismadata()
    const getBlogs = await blogs.findMany({orderBy:{createdAt:"desc"}})
    if(getBlogs.length == 0){
        return NextResponse.json({message:"there is no blogs you can add"})
    }

    return NextResponse.json({success:true,getBlogs})
    
} catch (error) {
    return NextResponse.json({error:`there is error with get data ${(error as Error).message}`})
}

}

