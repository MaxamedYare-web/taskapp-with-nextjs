import prismadata from "@/app/api/utils/prismadata";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';
interface IupUser{
    params:{
        id:string
    }
}

export async function PUT(req:NextRequest,{params}:IupUser){

 const {id} = await params
 let {firstname,lastname,email,password,username,role}:IpropRegister = await req.json()

 try {

    const {user} = await prismadata()
   if(!password){
    const upd = await user.update({where:{id:Number(id)},data:{
        firstname:firstname,
        lastname:lastname,
        email: email,
        username:username,
        role:role
    }})
    return NextResponse.json({success:true,message:`Successfully this user name: ${upd.firstname} was updated`},{status:200})
   }
   if(password){
 const salt = await bcrypt.genSalt(10)
 password = bcrypt.hashSync(password,salt) 
    const upd = await user.update({where:{id:Number(id)},data:{
        firstname:firstname,
        lastname:lastname,
        email: email,
        username:username,
        role:role,
        password:password
    }})
    return NextResponse.json({success:true,message:`Successfully this user Usrname: ${upd.username} was updated`},{status:200})
   }
 } catch (error) {
    return NextResponse.json({error:`error with updating: ${(error as Error).message}`})
 }

}



