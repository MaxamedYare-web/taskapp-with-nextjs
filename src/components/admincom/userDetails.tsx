"use client"

import { useDataAdmin } from "./utils/contextProvider"

interface IpropDetails  {
    id:string,
   
}
interface IuDetal {
    id:number,
    email:string,
    createdAt:string,
    firstname:string,
    role:string,
    username:string,
    name:string
}

 const UserDetails = ({id}:IpropDetails)=>{
    const {dataInfo,errorInfo,isloading} = useDataAdmin()
    if(isloading){
        return <h1>there is laoding</h1>
    }
    if(errorInfo){
        console.log("there is error with:",errorInfo)
    }

   if(dataInfo){
    const user:IuDetal[] =dataInfo.users
    const userIfo = user.find((u)=>u.id == Number(id))
    console.log(userIfo)
    return (<>
    <h1>userd id is: {userIfo?.firstname}</h1>
    </>)
   }

}

export default UserDetails






