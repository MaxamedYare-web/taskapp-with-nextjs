"use client"

import { getAllCurrents } from "@/app/lib/admin/currents"
import { useEffect, useState, useTransition } from "react"
import { SingleCurrentForm } from "./singleCurrentForm"

interface Icurrents {
    current_name: string
    key: string
    rate: number
    min: number
    max: number
    img: string
    reverse: number
    account_number: string
    code: string
    symbol: string
    category: string,
    active: boolean
    id:string
}

export default function ViewPageCom({id}:{id:string}){
const [isPending,startTransition] = useTransition()
const [singleCurrentData,setSingleCurrentData]=useState<Icurrents>()

useEffect(()=>{

 startTransition(async()=>{
    const result = await getAllCurrents()
    const current:Icurrents[] = result?.currents
    const filterCurrent = current?.find((cur)=>cur.id == id) 
  if(filterCurrent){
     setSingleCurrentData(filterCurrent)
  }
 })

},[startTransition])


if(!singleCurrentData){
   return
}

return (
    <>
    <main className="p-3 space-y-3">
       <div className="bg-default-50 rounded p-2">
        <h1 className="font-bold">View Single current</h1>
        <p className="font-semibold text-default-500 max-w-100 md:max-w-full">remember also you can update this current by click update button</p>
       </div>
       <SingleCurrentForm id={id} singleCurrent={singleCurrentData} isPending={isPending}/>
    </main>
    </>
)


}


