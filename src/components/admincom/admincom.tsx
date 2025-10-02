"use client"
import { useAdminAuth } from "@/app/lib/admin/adminauth"
import { CircularProgress, Spinner } from "@heroui/react"
import Cookies from "js-cookie"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import Headeradmin from "./headeradmin"
import NavBarCom from "./navbar"

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
            <CircularProgress size="lg" label="Loading..." />
        </div>
    )
  }

  if(adminData){
      return (
        <>
        <div className="flex flex-col">
            <div className="flex flex-row  items-start">
              <NavBarCom/>
               <Headeradmin/>
            </div>
           
        </div>
        </>
    )
  }
}
