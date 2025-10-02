"use client"
import { useAdminAuth } from "@/app/lib/admin/adminauth"
import { Spinner } from "@heroui/react"
import Cookies from "js-cookie"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export const AdminCom = ()=>{
    const {adminData,isloading,errorData,adminLog} = useAdminAuth()
    const token = Cookies.get("userToken")
    useEffect(()=>{
        if(!token){
         redirect("/auth/login")
        }
    adminLog(token)
    },[token])

  if(adminData){
    console.log(adminData)
  }


   useEffect(()=>{
     if(errorData){
    redirect("/dashboard")
    
    }
   },[errorData])


  if(isloading){
    return (
        <div className="flex justify-center items-center h-screen">
            <Spinner/>
            <h1>Loading...</h1>
        </div>
    )
  }

  if(adminData){
      return (
        <>
        <div className="h-screen flex justify-center items-center">
            <h1>Welcome admin page</h1>
        </div>
        </>
    )
  }
}
