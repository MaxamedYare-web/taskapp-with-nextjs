import { NextRequest, NextResponse } from "next/server";
import fs from "fs"
import path from "path";
import { console } from "inspector";



const deleteExtractImage = (deleteUrl:string)=>{

    const parseUrl = deleteUrl.split("/")
    console.log(parseUrl)
    return parseUrl[parseUrl.length -1]

}


export async function POST(req:NextRequest){
   const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "","blogs")
 const URL_API = `${process.env.URL_IMG}=${process.env.api_key_img}`

try {

const formdatas = await req.formData()
if(!formdatas){
    return NextResponse.json({error:"file not found please select file"},{status:401})
}


const body = Object.fromEntries(formdatas)

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
const delet_hash_url = deleteExtractImage(dataRes.data.delete_url)



return NextResponse.json({success:true, delet_hash_url,
    
display_url:dataRes.data.display_url,
dataRes
})

    
} catch (error) {
    NextResponse.json(error,{status:500})
}


}


