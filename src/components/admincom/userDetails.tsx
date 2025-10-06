'use client'

import { useDataAdmin } from "./utils/contextProvider"
import banerImg from "../../../public/intro01.png"
import { addToast, Avatar, Button, Card, CardBody, CardHeader, Form, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, useDisclosure, User } from "@heroui/react"
import { MdTask } from "react-icons/md"
import { Clock, Eye, EyeClosed, EyeOff, PersonStanding, User2 } from "lucide-react"
import { SiTelegram, SiWhatsapp, SiYoutube } from "react-icons/si"
import {formatDistance} from "date-fns"
import { UserTasks } from "@/app/lib/admin/taskUser"
import { useEffect, useState, useTransition } from "react"
import useUpdateUser from "@/app/lib/admin/updateUser"

import { getAndBanUser } from "@/app/action"


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
    lastname:string,
    password:string
    lastlogin:string
    banned:boolean
}

const userRole = [
    {
        key:"User",
        label:"User"
    },
    {
        key:"Admin",
        label:"Admin"
    }
]

 const UserDetails = ({id}:IpropDetails)=>{
    const {dataInfo,errorInfo,isloading} = useDataAdmin()
    const  {isOpen,onOpen,onOpenChange}= useDisclosure()
    const [isVisiblePassword,setIsVisiblePass] = useState<boolean>(false)
    const {userTask} = UserTasks(id)
    const {isloadingUpdate,updateDate,updateDataUser,setUpdateData} = useUpdateUser()
    const [ispending,startTransition] = useTransition()

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
       e.preventDefault()
       const dataInput = Object.fromEntries(new FormData(e.currentTarget))
       const dataAndId = {
        id:id,
        dataInput
       }
       updateDataUser(dataAndId)
    }
    
    const  handleBanUser = ()=>{
   
      startTransition(async()=>{
          const result =  await getAndBanUser(id, `/admin/users/${id}`)
            console.log(result)
        })

        
       
    }


    if(isloading){
        return <h1>there is laoding</h1>
    }
    if(errorInfo){
        console.log("there is error with:",errorInfo)
    }


      if(updateDate?.message){
        addToast({
            title:"😋Hampalyo conguration",
            description:updateDate.message,
            color:"success",
            timeout:5000,
            shouldShowTimeoutProgress:true,
        })
        setUpdateData(null)
      }
  
   if(dataInfo){
    const user:IuDetal[] =dataInfo.users
    const userIfo = user?.find((u)=>u.id == Number(id))
    return (<>
  <main className="p-3">
    <div className="">
        <div className="w-full flex justify-between items-center bg-white rounded p-2">
            <h1 className="font-semibold">User Details</h1>
            <Button onPress={onOpen} color={userIfo?.banned ? "danger" : "primary"}>{userIfo?.banned ? <div>
                {
                    ispending ? <div className="flex items-center"><Spinner color="warning" variant="simple"/> <h1>Opening account....</h1> </div> : 
                    <h1>Unban User</h1>
                } 
            </div> : "Ban User"}</Button>
        </div>
        {/* header */}
        <div className="bg-gradient-to-tl mt-3 rounded relative from-secondary-500 h-80  flex justify-center items-center to-primary-500 w-full">
        <Image className="h-80" src={banerImg.src}  alt="banner"/>
        <div className="absolute flex justify-center items-center flex-col z-10 -bottom-15">
          <Avatar color="primary" isBordered size="lg" src="https://i.pravatar.cc/400?img=58"/>
        
             <h1 className="font-semibold mt-1">{userIfo?.firstname}</h1>
           <p className="font-semibold text-gray-500">{userIfo?.email}</p>
          
        
        </div>
        </div>
        {/* contant */}
        <main className="bg-white p-5">
           
            <div className="flex justify-between items-center">
               {/* start */}
               <div className="flex gap-10">
                {/* items1 */}
                <div className="flex flex-col justify-center items-center">
                    <MdTask className="font-bold text-gray-500 text-2xl"/>
                <h1 className="font-bold text-gray-600">{userTask?.length}</h1>
                <p className="font-semibold text-gray-500">Total Tasks</p>
                </div>
                {/* items1 */}
                <div className="flex flex-col justify-center items-center">
                    <User2 className="font-bold text-gray-500 text-2xl"/>
                <h1 className="font-bold text-gray-600">{formatDistance(new Date((new Date(userIfo?.createdAt as any).toISOString())), new Date(),{addSuffix:true})}</h1>
                <p className="font-semibold text-gray-500">Joined</p>
                </div>
                {/* items1 */}
                <div className="flex flex-col justify-center items-center">
                    <Clock className="font-bold text-gray-500 text-2xl"/>
                <h1 className="font-bold text-gray-600">{formatDistance(new Date(new Date(userIfo?.lastlogin as any).toISOString()),new Date(),{addSuffix:true})}</h1>
                <p className="font-semibold text-gray-500">Last login</p>
                </div>
               </div>
               {/* end */}
               <div className="flex gap-2">
                {/* items1 */}
                <div className="flex flex-col justify-center items-center">
                  
                  <Avatar
                   size="sm"
                  classNames={{
                    base:"bg-success-500",
                    icon:"text-lg text-white"
                  }}
                  icon={<SiWhatsapp/>}/>
               
                </div>
                {/* items2 */}
                <div className="flex flex-col justify-center items-center">
                    <Avatar
                     size="sm"
                  classNames={{
                    base:"bg-primary-500",
                    icon:"text-lg text-white"
                  }}
                  icon={<SiTelegram/>}/>
                </div>
                {/* items1 */}
                <div className="flex flex-col justify-center items-center">
                      <Avatar
                      size="sm"
                  classNames={{
                    base:"bg-danger-500",
                    icon:"text-lg text-white"
                  }}
                  icon={<SiYoutube/>}/>
                </div>
               </div>
            </div>
        </main>

    </div>

    {/* form */}
    <Card className="mt-3">
        <CardHeader className="flex flex-col items-start">
            <h1 className="font-semibold">User Form</h1>
            <p className="font-semibold text-gray-500">You can update this user information</p>
        </CardHeader>
        <CardBody>
            <Form 
            aria-label="update user"
            onSubmit={handleSubmit}
            className="grid grid-cols-2">  
             <Input 
             name="firstname"
             errorMessage="Please enter name"
             classNames={{
                label:"font-bold text-gray-500"
             }} label="Firstname" defaultValue={userIfo?.firstname}/>
             <Input 
             name="lastname"
             errorMessage="Please enter  lastname"
             classNames={{
                label:"font-bold text-gray-500"
             }} label="Lastname" defaultValue={userIfo?.lastname}/>
             <Input
             name="username"
             errorMessage="Username is required"
             classNames={{
                label:"font-bold text-gray-500"
             }} label="Username" defaultValue={userIfo?.username}/>
             <Select name="role" defaultSelectedKeys={[String(userIfo?.role)]} placeholder="Select  user role and update">
                {
                    userRole.map((u)=>(
                        <SelectItem key={u.key}>{u.label}</SelectItem>
                    ))
                }
             </Select>
             <Input
             name="email"
             errorMessage="Enter email address"
             classNames={{
                label:"font-bold text-gray-500"
             }} label="Email" defaultValue={userIfo?.email}/>
             <Input 
             name="password"
             endContent={
                <Button  className="focus:outline-solid outline-transparent" 
                onPress={()=>setIsVisiblePass(!isVisiblePassword)} 
                variant="light">
                   {
                    !isVisiblePassword ?  <Eye/> : <EyeOff/>
                   }
                   
                   
                </Button>
             } classNames={{
                label:"font-bold text-gray-500"
             }} label="Password" type={isVisiblePassword ? "text" : "password"}/>
             <Button type="submit" className={`col-span-2  md:col-span-1 ` } color={isloadingUpdate ? "danger" : "primary"}>
                {
                    isloadingUpdate ? <div className="flex items-center justify-center">
                        <Spinner/> updating....
                    </div> : "Update"
                }
              
                </Button>
            </Form>
        </CardBody>
    </Card>

{/* model */}
 <Modal aria-label="ban user model" aria-labelledby="model"  classNames={{
    backdrop:"bg-primary-500/30"
 }} backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
    
    <ModalContent>
        {
            (onClose)=>(
                <>
                <ModalHeader className="uppercase">{userIfo?.banned ? "Open this account user":"Ban this user"}</ModalHeader>
                <ModalBody aria-labelledby="model body">
                    
                   {
                    userIfo?.banned ? <div>
                         <h1 className="text-primary-400">do you need to open?</h1>
                    <p>do you want to open this account? click yes or click no</p>
                    </div> : <div>
                         <h1 className="text-danger-400">Are you sure?</h1>
                    <p>do you want this user to ban? if you need to ban click yes or no to close</p>
                    </div>
                   }
                </ModalBody>
                <ModalFooter>
                    <Button onPress={onClose}>No</Button>
                    <Button type="submit" color="danger" onPress={()=>{
                        handleBanUser()
                        onClose()
                    }}>Yes</Button>
                </ModalFooter>
                </>
            )
           
        }
    </ModalContent>
 </Modal>

  </main>

    </>)
   }

   

}

export default UserDetails






