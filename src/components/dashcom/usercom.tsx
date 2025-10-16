"use client"
import { useUserDash } from '@/app/lib/userlib/user'
import cookies from "js-cookie"
import { redirect } from 'next/navigation'
import { Suspense, useEffect } from 'react'
interface IuserProp {
  name: string
  email: string
  username: string
}



const Usercom = () => {



  return (

    <div className='flex justify-center items-center flex-col h-screen'>
      <h1>Welcome dashboard page</h1>
      <p>Name:</p>
    </div>


  )
}

export default Usercom



