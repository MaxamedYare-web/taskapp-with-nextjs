import { useCallback } from "react"
import Api from "../apidata"



export default  function useUploadImage (){
    
  const UploadFile = useCallback(async(dataFile:any)=>{
    try {
        const formData = new FormData()
        formData.append("file",dataFile)
const response = await Api.post("/admin/upload",formData)
const data = await response.data

return data

    } catch (error) {
        console.log(error)
        return error
    }

  },[])

  return {UploadFile}


}








