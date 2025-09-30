import { NextRequest, NextResponse,  } from "next/server";
import prismadata from "../../utils/prismadata";
import * as bcrypt from 'bcrypt';
import generateToken from "../../utils/generatetoken";


export async function POST(req:NextRequest){

    let {firstname,lastname,username,email,password}:IpropRegister = await req.json()
   try {
     if(!firstname){
        return NextResponse.json({error:"Firstname is required please put you name"})
    }
    if(!lastname){
        return NextResponse.json({error:"lastName is required please put you father name"})
    }
    if(!username){
        return NextResponse.json({error:"username is required please put you nickname"})
    }
    if(!email){
        return NextResponse.json({error:"Email is required please put you email"})
    }
    if(!password){
        return NextResponse.json({error:"Password is required please put you password"})
    }

    

    const {user} = await prismadata()
    const extingUser = await user.findFirst({where:{OR:[{email:String(email)},{username:String(username)}]}})
    if(extingUser){
        return NextResponse.json({error:"this Email or Username already was token please use another email or username"})
    }
    const salt = await bcrypt.genSalt(10)
    password =  bcrypt.hashSync(password,salt)
    const createAccount = await user.create({data:{email:email,firstname:firstname,lastname:lastname,username:username,password:password}})
    if(createAccount){
 const token = generateToken(String(createAccount.id))
 return NextResponse.json({
    success:true,
    message:`successfully registered you account was created name: ${createAccount.firstname}`,
    token: token
}, {status:201}
)
    }
   } catch (error) {
    return NextResponse.json(error)
   }

}










