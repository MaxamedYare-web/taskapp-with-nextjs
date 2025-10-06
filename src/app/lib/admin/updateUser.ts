import { useCallback, useEffect, useState } from "react";
import Api from "../apidata";


export default function useUpdateUser(){

const [isloadingUpdate,setIsloadingUpdate]= useState<boolean>(false)
const [updateDate,setUpdateData] = useState<any | null>(null)
const [errorUpdate,setErrorUpdate] = useState<any | null>(null)

const updateDataUser = useCallback(async(data:any)=>{

    setIsloadingUpdate(true)
    try {
        const response = await Api.put(`/admin/userinfo/update/${data.id}`,data.dataInput)
        const dataU = await response.data
        setUpdateData(dataU)
        console.log(dataU)
    } catch (error) {
        setErrorUpdate(error)
        console.log(error)
    }finally{
        setIsloadingUpdate(false)
    }
},[])

 return {isloadingUpdate,updateDataUser,updateDate,errorUpdate,setUpdateData}


}








