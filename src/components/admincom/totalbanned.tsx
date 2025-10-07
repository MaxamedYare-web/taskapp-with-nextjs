"use client"
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@heroui/react"
import { useDataAdmin } from "./utils/contextProvider"
import React, { useCallback } from "react"

interface IbanUser {
    firstname:string,
    lastname:string,
    email:string,
    role:string,
    id:string
}

export const TotalBansUsers  = ()=>{


const {dataInfo,isloading}  = useDataAdmin()
const columns = [
    {
        key:"firstname",
        label:"firstname"
    },
    {
        key:"lastname",
        label:"lastname"
    },
    {
        key:"email",
        label:"email"
    },
    {
        key:"role",
        label:"role"
    },
]

if(isloading){
    return <h1>there is laoding...</h1>
}

const users:IbanUser[] = dataInfo?.users.filter((us:any)=>us.banned == true)
console.log(users)

if(!users){
    return <h1>user not found</h1>
}

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
}


},[])


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




