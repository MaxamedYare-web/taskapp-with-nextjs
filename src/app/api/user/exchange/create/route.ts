import prismadata from "@/app/api/utils/prismadata";
import { NextRequest, NextResponse } from "next/server";

interface IExchange {
  from_current_name: string,
  to_current_name: string,
  from_current_img: string,
  to_current_img: string,
  from_current_amount: number,
  to_current_amount: number,
  account_number: string,
  user_account_number: string,
  from_amount_code: string,
  to_amount_code: string,
  payment_proof:string,
  authorId:number
  userId?:number
  status:IstatusEx
}

type IstatusEx =  "waiting" | "complated" | "rejected" | "refund"

export async function POST(req:NextRequest){
 
    const {account_number,from_amount_code,from_current_amount,from_current_img,from_current_name,to_amount_code,
       to_current_amount,to_current_img,to_current_name,user_account_number,payment_proof,userId}:IExchange = await req.json()


try {
    const {user} = await prismadata()
    const userOrder = await user.findUnique({where:{id:userId}})
    const dataExhangeForm:IExchange = {
       account_number,
       from_amount_code,
       from_current_amount,
       from_current_img,
       from_current_name,
       to_amount_code,
       to_current_amount,
       to_current_img,
       to_current_name,
       user_account_number,
       payment_proof,
       authorId:Number(userOrder?.id),
       status:"waiting"
    }
 console.log(dataExhangeForm)

  const {exhangeUser} = await prismadata()
  const makeExchange = await exhangeUser.create({data:dataExhangeForm})
  if(!makeExchange){
    return NextResponse.json({success:false,error:"failed this exchange not created please try again"},{status:400})
  }

    return NextResponse.json({success:true,makeExchange},{status:201})
} catch (error) {
    return NextResponse.json({success:false,error:`there is error with create exchange: ${(error as Error).message}`},{status:400})
}


}





