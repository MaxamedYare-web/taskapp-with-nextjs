import { Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "rsuite"


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

export const NavBarDash = ({userAccountData,onOpen}:{userAccountData: IuserDash,onOpen:()=>void})=>{



    return (
      <div className="px-3">
     
        <Navbar className="w-full bg-default-50 rounded">
            <NavbarBrand className="hidden md:flex flex-col items-start leading-4 ">
                <h1 className="font-bold text-default-700">Dashboard</h1>
                <p className="font-semibold text-default-500 lowercase">{userAccountData?.role}</p>
            </NavbarBrand>
            <NavbarBrand className="md:hidden ">
               <Button onClick={onOpen} color="blue" style={{background:"blue",color:"white"}}>
        <MenuIcon/>
    </Button>
            </NavbarBrand>
            <NavbarContent  justify="center">
                <NavbarItem>
                  My Exchange
                </NavbarItem>
                <NavbarItem>
                    Start Exchange
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem as={Link} href={"/dashboard/profile"} className="flex items-center gap-3">
                  {
                    userAccountData?.avator=="" ?  <Avatar/> : <Avatar isBordered size="md" color="success" src={userAccountData?.avator}/>
                  }
                   <div className="leading-4 hidden md:block">
                    <h1 className="capitalize font-semibold text-default-600">{userAccountData?.firstname}</h1>
                    <p className="text-default-500">{userAccountData?.email}</p>
                   </div>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
        </div>
    )


}







