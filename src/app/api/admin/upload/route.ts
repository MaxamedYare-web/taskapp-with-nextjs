import { NextRequest, NextResponse } from "next/server";
import fs from "fs"
import path from "path";
import { console } from "inspector";

export async function POST(req:NextRequest){
   const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "","blogs")
 const URL_API = `${process.env.URL_IMG}=${process.env.api_key_img}`
 console.log("url api is:")
try {

const formdatas = await req.formData()
if(!formdatas){
    return NextResponse.json({error:"file not found please select file"},{status:401})
}


const body = Object.fromEntries(formdatas)
console.log(body)
const file = (body.file as Blob) || null

console.log(file)
const buffer = Buffer.from(await file.arrayBuffer())
const fileImage = buffer.toString("base64")
fs.mkdirSync(UPLOAD_DIR,{recursive:true})
fs.writeFileSync(
    path.resolve(UPLOAD_DIR,(body.file as File).name),
    buffer

)


const uploadForm = new FormData()
uploadForm.append("image",fileImage)
const response = await fetch(URL_API,{
    method:"POST",
    body:uploadForm
})

const dataRes = await response.json()


return NextResponse.json({success:true,display_url:dataRes.data.display_url})

    
} catch (error) {
    NextResponse.json(error,{status:500})
}


}


