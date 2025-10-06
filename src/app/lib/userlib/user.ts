import { useCallback, useState } from "react"
import Api from "../apidata"

export const useUserDash = ()=>{
    const [isLoading,setIsloading] = useState<boolean>()
    const [errors,setErrors] = useState<any | null>(null)
    const [userData,setUserData] = useState<any | null >(null)
 const userAccount = useCallback(async(_token:string)=>{
    setIsloading(true)
    setErrors(null)
    try {
        const response = await Api.get("/user")
        const dataUser = response.data
        setUserData(dataUser)
    } catch (error) {
        console.log(error)
        setErrors(error)
        setUserData(null)
    }finally{
        setIsloading(false)
    }

 },[])
 return {isLoading,userAccount,errors,userData}


}




