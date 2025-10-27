import prismadata from "@/app/api/utils/prismadata";
import { NextRequest, NextResponse } from "next/server";

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

export async function PUT(req:NextRequest,context:{params:{id:string} | Promise<{id:string}>}){

 const params = await context.params
 const {id} = params
     let {account_number,category,code,current_name,img,key,max,min,rate,reverse,symbol,active}:Icurrents = await req.json()
     if(!account_number || !category || !code || !current_name || !img || !key || !max || !min || !rate || !reverse || !symbol ){
         return NextResponse.json({success:false,error:"all input is required please fill"},{status:401})
     }

 try {

  const {allCurrents} = await prismadata()
  active == false ? false : true
  const updateCurrent = await allCurrents.update({where:{id:Number(id)},data:{
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
            active:Boolean(active)
        }})
        console.log(updateCurrent)
        
  if(!updateCurrent){
    return NextResponse.json({error:"there is error with updating please try again"},{status:401})
  }
  return NextResponse.json({success:true,message:`this current id ${updateCurrent.id} was updated`})
 } catch (error) {
    return NextResponse.json({error:`error with updating current ${(error as Error).message}`})
 }


}



