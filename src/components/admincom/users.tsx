"use client"

import { useAdminAuth } from "@/app/lib/admin/adminauth"
import { Button, Input, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import { Search } from "lucide-react"
import { useDataAdmin } from "./utils/contextProvider"
import { useMemo, useState } from "react"


export const UsrsCom = ()=>{

const {dataInfo,isloading,errorInfo} = useDataAdmin()

if(isloading){
    return <h1>laoding</h1>
}
console.log(dataInfo)

const [page,setPage] = useState<number>(1)

const rowsPerPage = 10

const pages = Math.ceil(dataInfo?.users?.length / rowsPerPage)


const items = useMemo(()=>{
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return dataInfo?.users?.slice(start,end)
},[page,dataInfo?.users])




    return (
       
        <main className="w-full space-y-3 flex-col">
            <div className="flex bg-secondary-50 rounded justify-between items-center p-3 w-full ">
                <h1 className="font-bold text-gray-600 text-2xl">Users</h1>
                <div>
                    <Input placeholder="Searching" 
                    startContent={<Search/>}
                    />
                </div>
            </div>

     <div className="bg-secondary-50 rounded">
        {/* <Table 
        bottomContent={
            <div className="w-full flex justify-center">
                <Pagination
                color="primary"
                page={page}
                total={pages}
                showControls
                showShadow
                isCompact
                onChange={
                    (page)=>setPage(page)
                }
                />
            </div>
        }
        >
            <TableHeader>
                <TableColumn key="name">NAME</TableColumn>
                <TableColumn key="role">ROLE</TableColumn>
                <TableColumn key="jon">JOINED</TableColumn>
                <TableColumn key="status">STATUS</TableColumn>
                <TableColumn key="action">ACTION</TableColumn>
            </TableHeader>
           <TableBody items={items}>
        {(item:any) => (
          <TableRow key={item.name}>
            {(columnKey:any) => <TableCell>{item[columnKey]}</TableCell>}
          </TableRow>
        )}
      </TableBody>
        </Table> */}
     </div>

        </main>
        
      
    )


}




