"use client"

import Cookies from "js-cookie"
import { redirect } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import Headeradmin from "./headeradmin"
import { AdminData } from "@/app/lib/admin/adminauth"

export const AdminCom = () => {

  const [isPending,startTransition] = useTransition()
  const [allData,setAllData] = useState<any | null>(null)
  useEffect(()=>{
    startTransition(async()=>{
      const result = await AdminData()
      setAllData(result)
    })

  },[])



  return (
    <>
      <div className="flex w-full">
        <Headeradmin currents={allData?.currents} isPending={isPending} users={allData?.users}/>
      </div>
    </>
  )

}
