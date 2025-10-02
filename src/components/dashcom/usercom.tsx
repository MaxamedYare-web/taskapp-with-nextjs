"use client"
import Api from '@/app/lib/apidata'
import React, { Suspense, useEffect, useState } from 'react'
import useSWR from "swr"
import cookies from "js-cookie"
import { redirect } from 'next/navigation'
import { useUserDash } from '@/app/lib/userlib/user'
interface IuserProp {
  name: string
  email: string
  username:string
}



const Usercom = () => {
  const token = cookies.get("userToken")
  const {errors,isLoading,userData,userAccount} = useUserDash()
   useEffect(()=>{
    if(!token){
    redirect("/auth/login")
 }
userAccount(token)
   },[token])


useEffect(()=>{
  if(errors){
    redirect("/auth/login")
  }

},[errors])

if(userData){
  console.log("userdata is:",userData)
}
 
 
    return ( 
    <Suspense fallback={<h1>please wating there is loading</h1>}>
      <div>
        <h1>Welcome dashboard page</h1>
        <p>Name:</p>
      </div>
    </Suspense>
      
    )
}

export default Usercom



