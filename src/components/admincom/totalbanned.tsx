"use client"
import { getAndBanUser } from "@/app/action"
import { addToast, Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@heroui/react"
import React, { useCallback, useTransition } from "react"
import { useDataAdmin } from "./utils/contextProvider"

interface IbanUser {
    firstname:string,
    lastname:string,
    email:string,
    role:string,
    id:string,
    createdAt:string,
    username:string
}

export const TotalBansUsers  = ()=>{

const [isPendign,startTransition] = useTransition()
const {dataInfo,isloading}  = useDataAdmin()
const columns = [
    {
        key:"firstname",
        label:"Name"
    },
    {
        key:"createdAt",
        label:"createdAt"
    },
    {
        key:"username",
        label:"Username"
    },
    {
        key:"role",
        label:"role"
    },
    {
        key:"action",
        label:"action"
    },
]

const handleOpenUserAccount = useCallback((id:string)=>{
    startTransition(async()=>{
        const result = await  getAndBanUser(id,"/admin/usrsban")
        addToast({
            title:"Successfully opened",
            description:result.data.message,
            timeout:3000,
            shouldShowTimeoutProgress:true,
            color:"success"

        })
        console.log(result.data.message)
    })
},[isPendign,startTransition])




type User = (typeof users)[0]



const renderCeill = useCallback((user:User,columkey:React.Key)=>{

const ceillValue = user[columkey as keyof User]

switch(columkey){
   case "firstname":
       return (
        <div>

    <User
    name={user.firstname}
    description={user.email}
    />

        </div>
       )
    case "createdAt":
        return <h1>{new Date(user.createdAt).toLocaleDateString()}</h1>
     case "role":
        return <h1>{user.role}</h1>
    case "action":
        return <Button onPress={()=>handleOpenUserAccount(user.id)} color="danger">{isPendign ? <div className="flex items-center">
            <Spinner color="warning" /> <h1>Opening...</h1></div>:"UnBan"  }</Button>
        case "username":
            return <h1>{user.username}</h1>
            default :
            return ceillValue
    }
    
},[isPendign,startTransition])


if(isloading){
    return <h1>there is laoding...</h1>
}

const users:IbanUser[] = dataInfo?.users.filter((us:any)=>us.banned == true)
console.log(users)

if(!users){
    return <h1>user not found</h1>
}


  if(users){
      return (
        <>
        <main className="p-3">
            <div className="bg-white p-2 rounded">
                <article>
                                    <h1 className="text-[20px] font-semibold">Users Banned</h1>
                <p className="font-semibold text-gray-500">Total Users was banned you can open any user yo need to open</p>
                </article>
            </div>
            {/* table */}
            <Table aria-label="table ban user" className="mt-3">
               <TableHeader >
                {
                    columns.map((col)=>(
                        <TableColumn key={col.key}>{col.label}</TableColumn>
                    ))
                }
                
               </TableHeader>
              {
                users?.length == 0 ?  <TableBody emptyContent={"there is No users to ban"}>
                {[]}
               </TableBody> : <TableBody items={users}> 

                  {
                    (item)=>(
                        <TableRow key={item.id}>
                          {  (columkey)=> <TableCell>{renderCeill(item,columkey)}</TableCell>
                          }
                        </TableRow>
                    )
                  }
               </TableBody>
              }
            </Table>
        </main>
        
        </>
    )
  }

  return null
}




