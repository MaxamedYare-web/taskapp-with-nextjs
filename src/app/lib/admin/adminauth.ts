import { redirect } from "next/navigation"
import { useCallback, useState } from "react"
import Api from "../apidata"



// get admin data and all users
export const AdminData = async()=>{

try {

    const response = await Api.get("/admin")
    return response.data
    
} catch (error) {
    return error
}

}







