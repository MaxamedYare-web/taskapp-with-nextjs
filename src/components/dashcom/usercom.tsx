"use client"
import { useUserDash } from '@/app/lib/userlib/user'
import cookies from "js-cookie"
import { redirect } from 'next/navigation'
import { Suspense, useEffect } from 'react'
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
    redirect("/dashboard/ban")
  }

},[errors])

   if(isLoading){
    return <h1>there is ladogn</h1>
   }

if(userData){
  console.log("userdata is:",userData)
}

 
    return ( 
  
      <div className='flex justify-center items-center flex-col h-screen'>
        <h1>Welcome dashboard page</h1>
        <p>Name:</p>
      </div>

      
    )
}

export default Usercom



