"use client"
import Api from '@/app/lib/apidata'
import React, { Suspense, useState } from 'react'
import useSWR from "swr"

interface IuserProp {
  name: string
  email: string
  username:string
}

const fecherU = (url:string) => Api.get(url).then((res)=>res.data)

const Usercom = () => {
  const {data,isLoading,error} =  useSWR("/user",fecherU)
 
 
    return ( 
    <Suspense fallback={<h1>please wating there is loading</h1>}>
      <div>
        <h1>Welcome dashboard page</h1>
        <p>Name:{data?.firstname}</p>
      </div>
    </Suspense>
      
    )
}

export default Usercom



