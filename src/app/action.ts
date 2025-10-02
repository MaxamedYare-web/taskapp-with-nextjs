"use server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


export const logoutSer = async()=>{
  const remove = (await cookies()).delete("userToken")
revalidatePath("/")
}
