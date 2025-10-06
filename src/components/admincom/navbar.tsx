"use client"
import { logoutSer } from "@/app/action";
import { useAdminAuth } from "@/app/lib/admin/adminauth";
import { Listbox, ListboxItem, Skeleton } from "@heroui/react";
import { Ban, LayoutDashboard, Settings, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { SiSpeedtest } from "react-icons/si";
import { TbBrandBlogger } from "react-icons/tb";





export default function NavBarCom() {


const {isloading} = useAdminAuth()

  const handleLogout = () => {
    logoutSer()
  }

useEffect(()=>{
  if(!isloading){
  
  }
},[isloading])



  return (
    <>
      <div className="w-sm bg-secondary-50 h-auto">

        <main className="mt-5">
          <div>
            <h1 className="text-2xl font-bold ml-2">Admin Dashboard </h1>
            <hr />
          </div>

          {/* show dashboard */}
          <Listbox aria-labelledby="list" aria-label="navbar list">

            <ListboxItem textValue="dash" key={"dash"} href="/admin" startContent={<LayoutDashboard />} variant="shadow" color="primary">
              <Skeleton isLoaded={true} className="font-bold text-md"> Dashboard</Skeleton>
            </ListboxItem>

            <ListboxItem textValue="user" key={"user"} href="/admin/users" startContent={<Users />} color="primary" variant="shadow">
              <Skeleton isLoaded={true} className="font-bold text-md"> Users</Skeleton>
            </ListboxItem>
            <ListboxItem textValue="ban" key={"ban"} startContent={<Ban />} color="primary" variant="shadow">
              <Skeleton isLoaded={true} className="font-bold text-md"> Banned User</Skeleton>
            </ListboxItem>
            <ListboxItem textValue="blog" key={"blog"} startContent={<TbBrandBlogger />} color="primary" variant="shadow">
              <Skeleton isLoaded={true} className="font-bold text-md">Blogs</Skeleton>
            </ListboxItem>
            <ListboxItem textValue="tes" key={"tes"} startContent={<SiSpeedtest />} color="primary" variant="shadow">
              <Skeleton isLoaded={true} className="font-bold text-md"> Testmonials</Skeleton>
            </ListboxItem>
            <ListboxItem textValue="set" key={"set"} startContent={<Settings />} color="primary" variant="shadow">
              <Skeleton isLoaded={true} className="font-bold text-md">Setting</Skeleton>
            </ListboxItem>
            <ListboxItem textValue="log" onClick={handleLogout} key={"log"} startContent={<CgLogOut />} color="danger" variant="shadow">
              <Skeleton isLoaded={true} className="font-bold text-md">Logout</Skeleton>
            </ListboxItem>
          </Listbox>


        </main>


      </div>

    </>

  );
}

