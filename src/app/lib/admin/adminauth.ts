import { redirect } from "next/navigation"
import { useCallback, useState } from "react"
import Api from "../apidata"


export const useAdminAuth = ()=>{
    const [isloading,setIsloading] = useState<boolean>(false)
    const [adminData,setAdminData] = useState<any | null>(null)
    const [errorData,setErrorData] = useState<any | null>(null)

 const adminLog = useCallback(async(token:string)=>{
    setIsloading(true)
    setErrorData(null)
    if(!token){
        redirect("/auth/login")
    }

    try {
        const response = await Api.get("/admin")
        const adminInfo = await response.data
        setAdminData(adminInfo)
        setErrorData(null)
    } catch (error) {
        setErrorData(errorData)
        setAdminData(null)
        redirect("/dashboard")
    }finally{
        setIsloading(false)
    }
 },[])

 return {isloading,adminData,adminLog,errorData}

}





