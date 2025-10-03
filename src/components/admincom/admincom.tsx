"use client"
import { useAdminAuth } from "@/app/lib/admin/adminauth"
import Cookies from "js-cookie"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import Headeradmin from "./headeradmin"




export const AdminCom = ()=>{
    const {adminData,isloading,errorData,adminLog} = useAdminAuth()




    const token = Cookies.get("userToken")
    useEffect(()=>{
        if(!token){
         redirect("/auth/login")
        }
    adminLog(token)
    },[token])

 


   useEffect(()=>{
     if(errorData){
    redirect("/dashboard")
    
    }
   },[errorData])





      return (
        <>
        <div className="flex w-full">
           
             
               <Headeradmin isLoading={isloading} dataInfo={adminData}/>
          
           
        </div>
        </>
    )
  
}
