"use server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import Api from "./lib/apidata"


export const logoutSer = async()=>{
  (await cookies()).delete("userToken")
revalidatePath("/")
}


 export  const getAndBanUser = async (id:string,currentPath: string)=>{
  "use server"

            try {
       
              const token = (await cookies()).get("userToken")?.value
           


            const response = await Api.put(`/admin/userinfo/ban/${id}`,{},{
              headers:{
                "Authorization":`Bearer ${token}`
              }
            })
            const data = await response.data
            revalidatePath(currentPath)
            revalidatePath("/")
            return {success:true,data}
        } catch (error) {
            console.log(error)
            return {success:false,error}
        }

        

        }
