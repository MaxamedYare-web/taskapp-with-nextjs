"use client"

import Api from "@/app/lib/apidata"
import { useEffect, useState, useTransition } from "react"
import banImage from "../../../../public/ban.png"
import { Button, Image, Skeleton } from "@heroui/react"
import Link from "next/link"

interface IresponseApi {
    err?:{
        response?:{
            data?:any
        }
    }
}
export default function PageBan(){

const [isPending,startTransition] = useTransition()
const [banData,setBanDta]= useState<string>("")

useEffect(()=>{
startTransition(async()=>{
    const result:IresponseApi = await fetchData() as any
   setBanDta(result?.err?.response?.data.error)
})
},[])


const fetchData = async()=>{
   try {
    const response = await Api.get("/user")
    const data = await response.data
    return {data}
   } catch (error) {
    const err = error
    return {err}
   }
}

if(isPending){
    return <div className="flex justify-center items-center h-screen p-5">
           <div className="flex items-center gap-2">

    <div>
        <Skeleton className="rounded"> <h1 className="text-2xl sm:text-6xl font-bold capitalize">sorry you account <br /> was banned</h1></Skeleton>
        <Skeleton className="mt-5 rounded">  <p className="max-w-100 font-bold mt-2 text-gray-500">{banData}</p></Skeleton>
       <Skeleton className="mt-5 rounded-full w-50"> <Button size="lg" href="/" as={Link} color="primary" className="text-2xl mt-2">Go Home</Button></Skeleton>
        
    </div>
    <Skeleton> <Image src={banImage.src}/></Skeleton>


           </div>

        </div>
}

    return (
        <div className="flex justify-center items-center h-screen p-5">
           <div className="flex items-center gap-2">

    <div>
         <h1 className="text-2xl sm:text-6xl font-bold capitalize">sorry you account <br /> was banned</h1>
         <p className="max-w-100 font-bold mt-2 text-gray-500">{banData}</p>
         <Button size="lg" href="/" as={Link} color="primary" className="text-2xl mt-2">Go Home</Button>
    </div>
 <Image src={banImage.src}/>

           </div>

        </div>
    )
}