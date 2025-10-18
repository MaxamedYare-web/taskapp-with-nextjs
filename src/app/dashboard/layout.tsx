"use client"
import { NavBarDash } from "@/components/dashcom/navbardash";
import { SideBarDash } from "@/components/dashcom/sidebar";
import { useDisclosure } from "@heroui/react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useUserDash } from "../lib/userlib/user";
import { useRouter } from "next/navigation";

interface IuserDash {
  avator: string,
  createdAt: string,
  email: string,
  firstname: string,
  lastlogin: string,
  lastname: string,
  role: string,
  username: string
}

export default function LayoutDashbout({ children }: { children: React.ReactNode },) {
  const { userData, userAccount,errors } = useUserDash()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const router = useRouter()
  const token = Cookies.get("userToken")
  useEffect(() => {
    userAccount(String(token))

  }, [token, userAccount])

  console.log(errors)
  if(errors){
    Cookies.remove("userToken")
  }

  // logout
  const logout = () => {
    Cookies.remove("userToken")
    router.refresh()
  }


  const userAccountData: IuserDash = userData?.account

  return (

    <div className="flex">
      <SideBarDash logout={logout} isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="w-full">
        <NavBarDash onOpen={onOpen} userAccountData={userAccountData} />

        {children}


      </div>
    </div>


  )


}



