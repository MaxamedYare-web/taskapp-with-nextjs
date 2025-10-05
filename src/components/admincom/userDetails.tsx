"use client"

import { useDataAdmin } from "./utils/contextProvider"
import banerImg from "../../../public/intro01.png"
import { Avatar, Button, Card, CardHeader, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, User } from "@heroui/react"
import { MdTask } from "react-icons/md"
import { Clock, PersonStanding, User2 } from "lucide-react"
import { SiTelegram, SiWhatsapp, SiYoutube } from "react-icons/si"
import {formatDistance} from "date-fns"
import { UserTasks } from "@/app/lib/admin/taskUser"
import { userInfo } from "os"

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
    const  {isOpen,onOpen,onOpenChange}= useDisclosure()
    const {userTask} = UserTasks(id)
   
   
    if(isloading){
        return <h1>there is laoding</h1>
    }
    if(errorInfo){
        console.log("there is error with:",errorInfo)
    }

   if(dataInfo){
    const user:IuDetal[] =dataInfo.users
    const userIfo = user?.find((u)=>u.id == Number(id))
     console.log(user)
    return (<>
   
  <main className="p-3">
    <div className="">
        <div className="w-full flex justify-between items-center bg-white rounded p-2">
            <h1 className="font-semibold">User Details</h1>
            <Button onPress={onOpen} color="danger">Ban User</Button>
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
                <h1 className="font-bold text-gray-600">30 min</h1>
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
    </Card>

 <Modal classNames={{
    backdrop:"bg-primary-500/30"
 }} backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
    
    <ModalContent>
        {
            (onClose)=>(
                <>
                <ModalHeader className="uppercase">Ban this user</ModalHeader>
                <ModalBody>
                    
                    <h1>Are you sure?</h1>
                    <p>do you want this user to ban? if you need to ban click yes or no to close</p>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={onClose}>No</Button>
                    <Button color="danger" onPress={onClose}>Yes</Button>
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






