import { redirect } from "next/navigation"
import { useCallback, useState } from "react"
import Api from "../apidata"




export const useAdminAuth = ()=>{
    const [isloading,setIsloading] = useState<boolean>(false)
    const [loadData,setLoadtData] = useState<boolean>(false)
    const [adminData,setAdminData] = useState<any | null>(null)
    const [errorData,setErrorData] = useState<any | null>(null)
      
 const adminLog = useCallback(async(token:string)=>{
    setIsloading(false)
    setErrorData(null)
    setLoadtData(true)
    if(!token){
        redirect("/auth/login")
    }

  

    try {
        const response = await Api.get("/admin")
        const adminInfo = await response.data
        setAdminData(adminInfo)
        setErrorData(null)
       
    } catch (error) {
        setErrorData(error)
        setAdminData(null)
    }finally{
        setIsloading(true)
        setLoadtData(false)
    }
 },[])

 return {isloading,adminData,adminLog,errorData,loadData}

}





