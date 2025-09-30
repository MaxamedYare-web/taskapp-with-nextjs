import Cookies from "js-cookie"
import { useCallback, useState } from "react"
import Api from "./apidata"
    
export  function useLoginUser  (){
     const [isLoading, setIsLoading] = useState<boolean>(false)
     const [errors, setErrors] = useState<any | null>(null)
      const [userData, setUserData] = useState<any>()

    const LoginUser = useCallback(async(data:any)=>{
  setIsLoading(true)
  setErrors(null)
       try {
            const response = await Api.post("/auth/login", data)
            const dataUser = await response.data
            if (dataUser.token) {
                const cookData = Cookies.set("userToken", dataUser.token, {
                    expires: 7
                })
                
                setUserData(dataUser)
            }
            if (dataUser.error) {

                setErrors(dataUser.error)
              
                return
            }
  
        } catch (error) {
            setErrors(error)
        } finally {
            setIsLoading(false)
        }


    },[])
  

return {LoginUser,isLoading,errors,userData}

}


    
