"use server";

import Api from "@/app/lib/apidata"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

interface IfunDel {
    deletBlogFun:any,
    message:any
}

export const blogDelAction = async(id:number | null):Promise<IfunDel> =>{


    const token = (await cookies()).get("userToken")
    console.log("token del blog is:",token?.value)
    try {
        const res = await Api.delete(`/admin/blogs/delete/${id}`,{
            headers:{
                Authorization: `Bearer ${token?.value}`
            }
        })
        const dataDel = await res.data
         revalidatePath("/admin/blogs")
        return {deletBlogFun:dataDel,message:null}
    } catch (error) {
        return {deletBlogFun:null,message:error}
    }


}



