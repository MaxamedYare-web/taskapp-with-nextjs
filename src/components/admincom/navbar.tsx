"use client";
import Cookies from "js-cookie";
import {
  Ban,
  Combine,
  LayoutDashboard,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { CgLogOut } from "react-icons/cg";
import { SiSpeedtest } from "react-icons/si";
import { TbBrandBlogger } from "react-icons/tb";
import { Nav, Sidenav } from "rsuite";
import "rsuite/Sidenav/styles/index.css";
import "rsuite/Nav/styles/index.css";
import { Accordion, AccordionItem, Drawer, DrawerBody, DrawerContent, Listbox, ListboxItem } from "@heroui/react";

export default function NavBarCom({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: () => void }) {
  const router = useRouter();

  const handleLogout = () => {
    const token = Cookies.remove("userToken");
    if (!token!) {
      router.refresh();
    }
  };

  return (
    <>
      {/* desktop */}
      <div className="w-[250px] lg:w-[400px] sm:bg-default-50 h-screen">
        <main className="mt-5">
          <div>
            <h1 className="text-2xl font-bold ml-2">Admin Dashboard </h1>
            <hr />
          </div>

          {/* show dashboard */}
           <Listbox aria-label="sidebar menu">
                     <ListboxItem
                     textValue="dashb"
                         key={"dashboard"}
                          href="/admin"
                          startContent={<LayoutDashboard />}
                          color="primary"
                        >
                          Dashboard
                        </ListboxItem>
                         <ListboxItem
                         textValue="user"
                         key={"users"}
                          href="/admin/users"
                          startContent={<Users />}
                          color="primary"
                        >
                          Users
                        </ListboxItem>
                         <ListboxItem
                         textValue="current"
                         key={"currents"}
                          href="/admin/currents"
                          startContent={<Wallet />}
                          color="primary"
                        >
                          Currents
                        </ListboxItem>

                        
                        <ListboxItem textValue="accourdinate">
                           <Accordion  aria-label="acour exchange">
                         <AccordionItem  
                         
                         startContent={<Combine/>} key={"1"} title="Exchange">
            
                          <Listbox aria-label="menu contain">
                             <ListboxItem textValue="all" key={"all exchange"}>All Exchange</ListboxItem>
                         
                          <ListboxItem href="/admin/pending" textValue="pending" key={"pending"}>Pending</ListboxItem>
                           <ListboxItem href="/admin/approved" textValue="approved" key={"approved"}>Approved</ListboxItem>
                          <ListboxItem href="/admin/refund" textValue="refund" key={"refund"}>Refund</ListboxItem>
                          <ListboxItem href="/admin/rejected" textValue="rejected" key={"rejected"}>Rejected</ListboxItem>
                          </Listbox>
                         </AccordionItem>
                        </Accordion>
                        </ListboxItem>
                       
                        <ListboxItem
                         textValue="ban user"
                          href="/admin/usrsban"
                          key={"ban"}
                          startContent={<Ban />}
                          color="primary"
                        >
                          Banned User
                        </ListboxItem>
                        <ListboxItem
                        textValue="blog"
                         key={"blogs"}
                          href="/admin/blogs"
                          startContent={<TbBrandBlogger />}
                          color="primary"
                        >
                          Blogs
                        </ListboxItem>
                        <ListboxItem
                        textValue="testmonial"
                         key={"testmonials"}
                          startContent={<SiSpeedtest />}
                          color="primary"
                        >
                          Testmonials
                        </ListboxItem>
                        <ListboxItem
                        textValue="setting"
                         key={"settings"}
                          href="/admin/setting"
                          startContent={<Settings />}
                          color="primary"
                        >
                          Setting
                        </ListboxItem>
                        <ListboxItem
                        textValue="logout"
                          key={"logout"}
                          onClick={handleLogout}
                           startContent={<CgLogOut />}
                          color="danger"
                        >
                          Logout
                        </ListboxItem>

                  </Listbox>
        </main>
      </div>

      {/* mobile */}
      <Drawer className="bg-default-100" isOpen={isOpen} onOpenChange={onOpenChange} placement="left" size="sm">
        <DrawerContent>
          <DrawerBody>
            <div>
              <main className="mt-5">
                <div>
                  <h1 className="text-2xl font-bold ml-2">Admin Dashboard </h1>
                  <hr />
                </div>

                {/* show dashboard */}
                <div>
                
                  <Listbox aria-label="sidebar menu">
                     <ListboxItem
                     textValue="dashb"
                         key={"dashboard"}
                          href="/admin"
                          startContent={<LayoutDashboard />}
                          color="primary"
                        >
                          Dashboard
                        </ListboxItem>
                         <ListboxItem
                         textValue="user"
                         key={"users"}
                          href="/admin/users"
                          startContent={<Users />}
                          color="primary"
                        >
                          Users
                        </ListboxItem>
                         <ListboxItem
                         textValue="current"
                         key={"currents"}
                          href="/admin/currents"
                          startContent={<Wallet />}
                          color="primary"
                        >
                          Currents
                        </ListboxItem>

                        
                        <ListboxItem textValue="accourdinate">
                           <Accordion  aria-label="acour exchange">
                         <AccordionItem  
                         
                         startContent={<Combine/>} key={"1"} title="Exchange">
            
                          <Listbox aria-label="menu contain">
                             <ListboxItem textValue="all" key={"all exchange"}>All Exchange</ListboxItem>
                          <ListboxItem textValue="approved" key={"approved"}>Approved</ListboxItem>
                          <ListboxItem textValue="pending" key={"pending"}>Pending</ListboxItem>
                          <ListboxItem textValue="refund" key={"refund"}>Refund</ListboxItem>
                          <ListboxItem textValue="rejected" key={"rejected"}>Rejected</ListboxItem>
                          </Listbox>
                         </AccordionItem>
                        </Accordion>
                        </ListboxItem>
                       
                        <ListboxItem
                         textValue="ban user"
                          href="/admin/usrsban"
                          key={"ban"}
                          startContent={<Ban />}
                          color="primary"
                        >
                          Banned User
                        </ListboxItem>
                        <ListboxItem
                        textValue="blog"
                         key={"blogs"}
                          href="/admin/blogs"
                          startContent={<TbBrandBlogger />}
                          color="primary"
                        >
                          Blogs
                        </ListboxItem>
                        <ListboxItem
                        textValue="testmonial"
                         key={"testmonials"}
                          startContent={<SiSpeedtest />}
                          color="primary"
                        >
                          Testmonials
                        </ListboxItem>
                        <ListboxItem
                        textValue="setting"
                         key={"settings"}
                          href="/admin/setting"
                          startContent={<Settings />}
                          color="primary"
                        >
                          Setting
                        </ListboxItem>
                        <ListboxItem
                        textValue="logout"
                          key={"logout"}
                          onClick={handleLogout}
                           startContent={<CgLogOut />}
                          color="danger"
                        >
                          Logout
                        </ListboxItem>

                  </Listbox>
              
                      
                  
                </div>
              </main>
            </div>
          </DrawerBody>
        </DrawerContent>

      </Drawer>
    </>
  );
}
