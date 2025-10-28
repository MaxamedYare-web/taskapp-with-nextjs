"use client"
import HeaderNavBar from '@/components/admincom/headerNavBar'
import NavBarCom from '@/components/admincom/navbar'
import { DataProvideContext } from '@/components/admincom/utils/contextProvider'
import React, { useEffect, useState, useTransition } from 'react'
import Cookies from 'js-cookie'
import { AdminData } from '../lib/admin/adminauth'
import { useDisclosure } from '@heroui/react'



export default function layout({ children }: { children: React.ReactNode }) {
  const [isPending,startTransition] = useTransition()
  const [allData,setAllData] = useState<any | null>(null)
  const {isOpen,onOpen,onOpenChange} = useDisclosure()


  useEffect(()=>{

    startTransition(async()=>{
      const result = await AdminData()
      if(result){
          setAllData(result)
      }
     
    })

  },[])



  return (
    <div className="flex">
      <div className="hidden sm:block sm:bg-default-50">
        <NavBarCom isOpen={isOpen} onOpenChange={onOpenChange}/>
      </div>
      <div className='w-full'>
        <HeaderNavBar onOpen={onOpen} isPending={isPending} adminInfo={allData?.adminData} />
        <DataProvideContext>
          {children}
        </DataProvideContext>
      </div>

    </div>

  )
}
