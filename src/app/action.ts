"use server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


export const logoutSer = async()=>{
  (await cookies()).delete("userToken")
revalidatePath("/")
}
