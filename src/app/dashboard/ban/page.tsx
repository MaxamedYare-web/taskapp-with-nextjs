"use client"

import Api from "@/app/lib/apidata"
import { useEffect, useTransition } from "react"


export default function PageBan(){

const [isPending,startTransition] = useTransition()

useEffect(()=>{
startTransition(async()=>{
    const result = await fetchData()
    console.log(result)
})
},[])


const fetchData = async()=>{
   try {
    const response = await Api.get("/user")
    const data = await response.data
    return {data}
   } catch (error) {
    return {error}
   }
}

if(isPending){
    return <h1>there is laoding</h1>
}

    return (
        <div className="flex justify-center items-center h-screen">
            <h1>sorry you accoun was banned</h1>
        </div>
    )
}