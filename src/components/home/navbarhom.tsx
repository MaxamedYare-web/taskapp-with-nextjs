"use client"
import { Avatar, Button, Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Skeleton } from "@heroui/react"
import logoImg from "../../../public/logo/logo.png"
 import  Cookies from "js-cookie"
import { useUserDash } from "@/app/lib/userlib/user"
import { useEffect } from "react"

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


const NavBarHome = ()=>{

const token = Cookies.get("userToken")
const {isLoading,userAccount,userData} = useUserDash()


useEffect(()=>{
    userAccount(String(token))
},[token,userAccount])

 const userInfo:IuserDash = userData?.account

if(isLoading){
    return  <Navbar className="bg-gradient-to-bl from-primary-500/70 to-secondary-500/70 text-white">
        <NavbarBrand >
           <Image alt="main logo" className="w-50 h-30"  src={logoImg.src}/>
        </NavbarBrand>
        <NavbarContent  className="hidden sm:flex" justify="center">
            <NavbarItem>
                <Link className="text-white">Home</Link>
            </NavbarItem>
            <NavbarItem>
                <Link className="text-white">About</Link>
            </NavbarItem>
            <NavbarItem>
                <Link className="text-white">Contact</Link>
            </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem className="text-white">

            
              
               <div className="flex items-center gap-2">

               <Skeleton className="w-10 h-10 rounded-full">
                  {
                    userInfo?.avator == "" ? <Avatar/> : "yes"
                 }
               </Skeleton >
                 <div className="">
                   <Skeleton className="w-40 rounded"> <h1 className="capitalize w-10 h-3">{userInfo?.firstname}</h1></Skeleton>
                   <Skeleton className="w-50 mt-1 rounded"> <p className="w-20 h-3">{userInfo?.email}</p></Skeleton>
                 </div>

               </div>

            

            </NavbarItem>
        </NavbarContent>
    </Navbar>
}

return(
    <Navbar className="bg-gradient-to-bl from-primary-500/70 to-secondary-500/70 text-white">
        <NavbarBrand >
           <Image alt="main logo two" className="w-50 h-30"  src={logoImg.src}/>
        </NavbarBrand>
        <NavbarContent  className="hidden sm:flex" justify="center">
            <NavbarItem>
                <Link className="text-white">Home</Link>
            </NavbarItem>
            <NavbarItem>
                <Link className="text-white">About</Link>
            </NavbarItem>
            <NavbarItem>
                <Link className="text-white">Contact</Link>
            </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem as={Link} href={userInfo?.email && "/dashboard/profile"} className="text-white">

            {
                !token ?    <Button  as={Link} href="/auth/login" color="primary" 
               className="text-default-50" variant="shadow">Login</Button> : 
               <div className="flex items-center gap-2">

                 {
                    userInfo?.avator == "" ? <Avatar/> : <Avatar isBordered size="md" color="success" src={userInfo?.avator}/>
                 }
                 <div className="leading-4 ">
                    <h1 className="capitalize">{userInfo?.firstname}</h1>
                    <p>{userInfo?.email}</p>
                 </div>

               </div>

            }

            </NavbarItem>
        </NavbarContent>
    </Navbar>
)



 }


 export default NavBarHome









