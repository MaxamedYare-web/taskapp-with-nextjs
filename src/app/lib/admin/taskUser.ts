import { useEffect, useState } from "react"
import Api from "../apidata"



export const UserTasks = (id:string)=>{
 
    const [userTask,setUserTask] = useState<any | null>(null)
    const [isloadingTask,setSloaingTask] = useState<boolean>(false)
useEffect(()=>{
    const fetchTasks = async()=>{
        setSloaingTask(true)
        try {
            const response = await Api.get(`/admin/userinfo/${id}`)
            const taskData = await response.data
            setUserTask(taskData)
        } catch (error) {
            console.log(error)
        }finally{
            setSloaingTask(false)
        }
    }
    fetchTasks()
},[id])

return {userTask,isloadingTask}

}


