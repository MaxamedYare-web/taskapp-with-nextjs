"use client"
import { Listbox, ListboxItem, Skeleton } from "@heroui/react";
import Cookies from "js-cookie";
import { Ban, LayoutDashboard, Settings, Users, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { CgLogOut } from "react-icons/cg";
import { SiSpeedtest } from "react-icons/si";
import { TbBrandBlogger } from "react-icons/tb";




export default function NavBarCom() {
const router = useRouter()



  const handleLogout = () => {
    const token = Cookies.remove("userToken")
    if(!token!){
       router.refresh()
    }
    
  }





  return (
    <>
      <div className="w-sm bg-default-50 h-screen">

        <main className="mt-5">
          <div>
            <h1 className="text-2xl font-bold ml-2">Admin Dashboard </h1>
            <hr />
          </div>

          {/* show dashboard */}
          <Listbox aria-labelledby="list" >

            <ListboxItem textValue="dash" key={"dash"} href="/admin" startContent={<LayoutDashboard />} variant="shadow" color="primary">
              <Skeleton isLoaded={true} className="font-bold text-md"> Dashboard</Skeleton>
            </ListboxItem>

            <ListboxItem textValue="user" key={"user"} href="/admin/users" startContent={<Users />} color="primary" variant="shadow">
              <Skeleton isLoaded={true} className="font-bold text-md"> Users</Skeleton>
            </ListboxItem>
            <ListboxItem textValue="currents" key={"currents"} href="/admin/currents" startContent={<Wallet />} color="primary" variant="shadow">
              <Skeleton isLoaded={true} className="font-bold text-md"> Currents</Skeleton>
            </ListboxItem>
            <ListboxItem textValue="ban" href="/admin/usrsban" key={"ban"} startContent={<Ban />} color="primary" variant="shadow">
              <Skeleton isLoaded={true} className="font-bold text-md"> Banned User</Skeleton>
            </ListboxItem>
            <ListboxItem href="/admin/blogs"  textValue="blog" key={"blog"} startContent={<TbBrandBlogger />} color="primary" variant="shadow">
              <Skeleton isLoaded={true} className="font-bold text-md">Blogs</Skeleton>
            </ListboxItem>
            <ListboxItem textValue="tes" key={"tes"} startContent={<SiSpeedtest />} color="primary" variant="shadow">
              <Skeleton isLoaded={true} className="font-bold text-md"> Testmonials</Skeleton>
            </ListboxItem>
            <ListboxItem href="/admin/setting" textValue="set" key={"set"} startContent={<Settings />} color="primary" variant="shadow">
              <Skeleton isLoaded={true}  className="font-bold text-md">Setting</Skeleton>
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

