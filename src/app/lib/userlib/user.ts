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

// user data
export const userDataOnline = async()=>{
   try {
     const res = await Api.get("/user")
     return await res.data
   } catch (error) {
    console.log(error)
    return error
   }
}

// update profile image
export const uploadImageProfile = async (dataFile:any)=>{

  
const formData = new FormData()
formData.append("file",dataFile)
try {

    const response = await Api.put("/user/upload",formData)
    return response.data
    
} catch (error) {
    return error
}

}

// update prisma image avator 
export const UpdateAvatorUser = async (data:{avator:string,id:string})=>{
    try {
        const res = await Api.put("/user/avator",data)
        return res.data
    } catch (error) {
        return error
    }
}

// upload payment screanshot
export const ExhangeFormUpload = async(file:File)=>{
    const apu_url = process.env.NEXT_PUBLIC_URL_IMG as string
const formFile = new FormData()
formFile.append("image",file)

try {

    const response = await fetch(apu_url,{
        method:"POST",
        body:formFile
    })
    const data = await response.json()
    return data.data.display_url
    
} catch (error) {
   console.log(error)
}

}

// create exchange data
export const createExchange = async(exchangeData:any)=>{
 try {
     const res = await Api.post("/user/exchange/create",exchangeData)
     return await res.data
 } catch (error) {
    console.log(error)
    return error
 }
  
}




