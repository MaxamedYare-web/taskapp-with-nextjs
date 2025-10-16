"use client"

import Api from "@/app/lib/apidata"
import { Skeleton, User } from "@heroui/react"
import { useEffect, useState } from "react"



 const HeaderNavBar =()=>{
    const [adminInfo,setAdminInfo] = useState<any | null>(null)
    const [errorInfo,setErrorInfo] = useState<any | null>(null)
    const [isloadin,setisloadin] = useState<boolean>(false)

useEffect(()=>{
    const dataUser = async()=>{
        setisloadin(false)
        try { 
    const response = await Api.get("/admin")
    const dataUserAdmin = await response.data.adminData
     setAdminInfo(dataUserAdmin)
        } catch (error) {
           setErrorInfo(error)
        }finally{
            setisloadin(true)
        }
    }
    dataUser()
},[])



return(
     <div className='flex justify-between items-center m-3 bg-white p-3 rounded'>
    <h1 className='text-lg md:text-2xl  font-bold text-gray-700'>Welcome Back, Admin</h1>

{
  !isloadin ? <div className="max-w-[300px] w-full flex items-center gap-3">
      <div>
        <Skeleton isLoaded={isloadin} className="flex rounded-full w-12 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton isLoaded={isloadin} className="h-3 w-3/5 rounded-lg" />
        <Skeleton isLoaded={isloadin} className="h-3 w-4/5 rounded-lg" />
      </div>
    </div> :  <User className='font-semibold capitalize'
     name={adminInfo?.username} 
    description={`@${adminInfo?.role} `}/>

}
    
      </div>
)

}

export default HeaderNavBar


