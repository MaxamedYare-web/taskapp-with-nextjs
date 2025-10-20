import prismadata from "@/app/api/utils/prismadata"
import { NextRequest, NextResponse } from "next/server"

interface Icurrents {
    current_name: string
    key: string
    rate: number
    min: number
    max: number
    img: string
    reverse: number
    account_number: string
    code: string
    symbol: string
    category: CurrentCat,
    active: boolean
  

}
type CurrentCat = "fiat" | "crypto"


export async function POST(req:NextRequest){
    const {account_number,category,code,current_name,img,key,max,min,rate,reverse,symbol,active}:Icurrents = await req.json()
    if(!account_number || !category || !code || !current_name || !img || !key || !max || !min || !rate || !reverse || !symbol ){
        return NextResponse.json({success:false,error:"all input is required please fill"},{status:401})
    }

    try {

        const {user} = await prismadata()
        const adminId = await user.findFirst({where:{role:"Admin"}})
         if(!adminId){
            return NextResponse.json({success:false,error:"admin id not foud please refresh the page"},{status:404})
         }
        const {allCurrents} = await prismadata()
        const addCurent = await allCurrents.create({data:{
            account_number:account_number,
            category:category,
            code:code,
            current_name:current_name,
            img:img,
            key:key,
            max:max,
            min:min,
            rate:rate,
            reverse:String(reverse),
            symbol:symbol,
            authorId:adminId.id,
            active:active
        }})

        if(!addCurent){
            return NextResponse.json({success:false,error:"failed with create current please tryt again"},{status:401})
        }

        return NextResponse.json({success:true,message:"Successfully this current was created",},{status:201})   
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:`there is error with adding current: ${(error as Error).message}`},{status:500})
    }

}



