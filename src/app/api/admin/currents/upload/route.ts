import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs"

export async function POST(req: NextRequest) {
    const formDataF = await req.formData()
    const upload_dir = path.resolve(process.env.ROOT_PATH ?? "", "currents image")

    const body = Object.fromEntries(formDataF)
    const file = body.file as File
     console.log(" file is:",file)
    const url_api = `${process.env.URL_IMG}=${process.env.api_key_img}`
    const formDataImagebb = new FormData()
    formDataImagebb.append("image", file)
    try {
        const response = await fetch(url_api, {
            method: "POST",
            body: formDataImagebb
        })
       
       if(!response.ok){
        return NextResponse.json({error:"there is error with upload image please try again"},{status:400})
       }
        const dataRes = await response.json()

const buffer = Buffer.from(await file.arrayBuffer())
fs.mkdirSync(upload_dir,{recursive:true})
fs.writeFileSync(
    path.resolve(upload_dir,file.name),
    buffer
)

        return NextResponse.json({ success: true, desplay_url: dataRes.data.display_url })

    } catch (error) {
        
        return NextResponse.json({ error: `there is error with uploading current image: ${(error as Error).message}` }, { status: 500 })
    }

}









