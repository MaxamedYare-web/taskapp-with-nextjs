import { NextRequest, NextResponse,  } from "next/server";
import prismadata from "../../utils/prismadata";
import * as bcrypt from 'bcrypt';
import generateToken from "../../utils/generatetoken";


export async function POST(req:NextRequest){

    let {firstname,lastname,username,email,password}:IpropRegister = await req.json()
   try {
     if(!firstname){
        return NextResponse.json({error:"Firstname is required please put you name"},{status:400})
    }
    if(!lastname){
        return NextResponse.json({error:"lastName is required please put you father name"},{status:400})
    }
    if(!username){
        return NextResponse.json({error:"username is required please put you nickname"},{status:400})
    }
    if(!email){
        return NextResponse.json({error:"Email is required please put you email"},{status:400})
    }
    if(!password){
        return NextResponse.json({error:"Password is required please put you password"},{status:400})
    }
    const {user} = await prismadata()
    const extingUser = await user.findFirst({where:{OR:[{email:String(email)},{username:String(username)}]}})
    if(extingUser){
        return NextResponse.json({error:"this Email or Username already was token please use another email or username"})
    }
    const salt = await bcrypt.genSalt(10)
    password =  bcrypt.hashSync(password,salt)
    const createAccount = await user.create({data:{email:email,firstname:firstname,lastname:lastname,username:username,password:password}})
    console.log("create accouint data is",createAccount)
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
    const err = (error as Error).message
    return NextResponse.json({error:`there is errors with create account: ${err}`},{status:500})
   }

}










