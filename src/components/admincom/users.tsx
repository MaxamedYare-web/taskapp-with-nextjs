"use client"

import { useAdminAuth } from "@/app/lib/admin/adminauth"
import { Button, getKeyValue, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure, User } from "@heroui/react"
import { Delete, Edit, Eye, Search } from "lucide-react"
import { useDataAdmin } from "./utils/contextProvider"
import { useCallback, useMemo, useState } from "react"
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";

interface IpropUser {
    firstname:string,
    username:string,
    email:string,
    id:number,
    createdAt:string,
    role:string
}

export const UsrsCom = ()=>{
const {isOpen,onOpen,onOpenChange} = useDisclosure()
const {dataInfo,isloading,errorInfo} = useDataAdmin()
const [selectUser,setSelectUser] = useState<IpropUser | null>(null)
const [searchValue,setSearchValue]= useState<string>("")



const user:IpropUser[] = dataInfo?.users
const users = user?.filter((u)=>u?.email?.includes(searchValue))
const colums = [
    {
        key:"firstname",
        label:"NAME"
    },
    {
        key:"createdAt",
        label:"JOINED"
    },
    {
        key:"role",
        label:"ROLE"
    },
    {
        key:"status",
        label:"ROLE"
    },
    {
        key:"action",
        label:"ACTION"
    },
    
]
console.log("errors is:",errorInfo)
const [page,setPage] = useState<number>(1)
const rowPerPage = 7

const pages = Math.ceil(users?.length / rowPerPage)

const itemsUser = useMemo(()=>{
    const start = (page - 1) * rowPerPage
    const end = start + rowPerPage

   return users?.slice(start,end)
},[page,users])



type User = (typeof users)[0]

const handleDeleteClick =(user:IpropUser)=>{
onOpen()
setSelectUser(user)
}

const renderCell = useCallback((user:User,columkey:React.Key)=>{
  const cellValue = user[columkey as keyof User]

  switch(columkey){
    case "firstname":
    return(
        <div>
        <User
        description={user.email}
        title={user.firstname}
        name={cellValue}
        >
            {user.email}
        </User>
        </div>
    )

    case "createdAt" : 
    return (
        <h1>{new Date(user.createdAt).toLocaleString()}</h1>
    )
    case "role":
        return(
            <h1 className={`${user.role =="Admin" && "text-primary font-bold" }`}>{user.role}</h1>
        )
    case "action" :
        return (
            <>
            <div className="flex justify-center items-center gap-2">
                <Tooltip content="User Details">
                   <Link href={`/admin/users/${user.id}`}><MdOutlineRemoveRedEye /></Link>
                </Tooltip>
                <Tooltip content="Edit User">
                  <CiEdit />
                </Tooltip>
                <Tooltip color="danger" content="Delete User">
                 <RiDeleteBin6Line onClick={()=>handleDeleteClick(user)} className="text-danger"/>
                  
              
                </Tooltip>
            </div>
            </>
        )
  }

},[])

if(isloading){
    return <h1>laoding</h1>
}

if(!users || users.length == 0){
    return null
}



   if(users){
     return (
       
        <main className="w-full space-y-3 flex-col">
            <div  className="flex bg-white rounded justify-between items-center p-3 w-full ">
                <h1 className="font-bold text-gray-600 text-2xl">Users</h1>
                <div>
                    <Input placeholder="Searching" 
                    startContent={<Search/>}
                    onChange={(e)=>setSearchValue(e.target.value)}
                    />
                </div>
            </div>

     <div className="bg-secondary-50 rounded">
    {/* table */}
    <Table aria-label="user information"
    bottomContent = {
        <div className="w-full flex justify-center">
            <Pagination
            color="primary"
            showControls
            showShadow
            isCompact
            total={pages}
            onChange={(page)=>setPage(page)}
            />
        </div>
    }
    >
        <TableHeader columns={colums} >
            {
                (col)=> <TableColumn key={col.key} align={col.key == "action" ? "center" :"start"}>{col.label}</TableColumn>
            }
        </TableHeader>
        <TableBody items={itemsUser}>
          {
            (item)=>(
                <TableRow  key={item.id}>
                  {
                    (columkey)=> <TableCell>{renderCell(item,columkey)}</TableCell>
                  }
                </TableRow>
            )
          }
        </TableBody>
    </Table>
     </div>

         <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
{  (onClose)=>(
                       <>
                       <ModalHeader>DELETE USER iD: {selectUser?.id}</ModalHeader>
                         <ModalBody>
                            <h1>Are you sure?</h1>
                            <p>Do you want to delete this <strong>{selectUser?.firstname}</strong> click if yes or click close if not,
                                Note if you delete this user all data this user will be Delete
                                you can ban and data will not delete
                            </p>
                         </ModalBody>
                         <ModalFooter>
                            <Button onPress={onClose}>Close</Button>
                            <Button onPress={onClose} color={"danger"}>Yes</Button>
                         </ModalFooter>
                         </>
                        )}
                        
                    </ModalContent>
                  </Modal>

        </main>
        
      
    )
   }


}




