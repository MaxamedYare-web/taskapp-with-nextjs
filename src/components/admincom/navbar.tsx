"use client"
import { Link, Listbox, ListboxItem, Skeleton } from "@heroui/react";
import { Ban, LayoutDashboard, Settings, Users } from "lucide-react";
import {TbBrandBlogger} from "react-icons/tb"
import { SiSpeedtest } from "react-icons/si";
import { CgLogOut } from "react-icons/cg";
import React from "react";
import { logoutSer } from "@/app/action";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

interface IpropFun {
  isloading:any,
  logout:()=> void
}

export default function NavBarCom() {




// const handleLogout = ()=>{
//   logoutSer()
//   logout()
// }
// isLoaded={isloading}


  return (
   <>
   <div className="w-sm bg-secondary-50 h-screen">
   
   <main className="mt-5">
    <div>
    <h1 className="text-2xl font-bold ml-2">Admin Dashboard </h1>
    <hr />
   </div>

{/* show dashboard */}
 <Listbox>

      <ListboxItem href="/admin" startContent={<LayoutDashboard/>} variant="shadow" color="primary">
       <Skeleton  isLoaded={true} className="font-bold text-md"> Dashboard</Skeleton>
    </ListboxItem>
 
    <ListboxItem href="/admin/users"  startContent={<Users/>} color="primary" variant="shadow">
       <Skeleton  isLoaded={true} className="font-bold text-md"> Users</Skeleton>
    </ListboxItem>
    <ListboxItem startContent={<Ban/>} color="primary" variant="shadow">
       <Skeleton isLoaded={true} className="font-bold text-md"> Banned User</Skeleton>
    </ListboxItem>
    <ListboxItem startContent={<TbBrandBlogger />} color="primary" variant="shadow">
        <Skeleton isLoaded={true} className="font-bold text-md">Blogs</Skeleton>
    </ListboxItem>
    <ListboxItem startContent={<SiSpeedtest />} color="primary" variant="shadow">
       <Skeleton isLoaded={true} className="font-bold text-md"> Testmonials</Skeleton>
    </ListboxItem>
    <ListboxItem startContent={<Settings />} color="primary" variant="shadow">
       <Skeleton  isLoaded={true} className="font-bold text-md">Setting</Skeleton>
    </ListboxItem>
    <ListboxItem  startContent={<CgLogOut />} color="danger" variant="shadow">
       <Skeleton isLoaded={true} className="font-bold text-md">Logout</Skeleton>
    </ListboxItem>
 </Listbox>


   </main>


   </div>
   
   </>

  );
}

