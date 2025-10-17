"use client"
import { NavBarDash } from "@/components/dashcom/navbardash";
import { SideBarDash } from "@/components/dashcom/sidebar";
import { useDisclosure } from "@heroui/react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useUserDash } from "../lib/userlib/user";

interface IuserDash {
  avator:string,
 createdAt:string,
  email:string,
  firstname:string,
  lastlogin:string,
  lastname:string,
  role:string,
  username:string
}

export default function LayoutDashbout({ children }: { children: React.ReactNode },) {
  const { errors, isLoading, userData, userAccount } = useUserDash()
  const {isOpen,onOpen,onOpenChange} = useDisclosure()
  const  token = Cookies.get("userToken")
  useEffect(()=>{
    userAccount(String(token))

  },[token])




 const userAccountData:IuserDash= userData?.account
 
  return (

    <div className="flex">
      <SideBarDash isOpen={isOpen}  onOpenChange={onOpenChange}/>
      <div className="w-full">
        <NavBarDash onOpen={onOpen} userAccountData={userAccountData}/>
       
 {children}
       
     
      </div>
    </div>


  )


}



