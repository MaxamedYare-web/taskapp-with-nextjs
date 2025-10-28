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
import { Drawer, DrawerBody, DrawerContent } from "@heroui/react";

export default function NavBarCom({isOpen,onOpenChange}:{isOpen:boolean,onOpenChange:()=>void}) {
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
          <div>
            <Sidenav>
              <Sidenav.Body className="">
                <Nav className="bg-red-600" style={{backgroundColor:"red"}}>
                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    href="/admin"
                    icon={<LayoutDashboard />}
                    color="primary"
                  >
                    Dashboard
                  </Nav.Item>

                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    href="/admin/users"
                    icon={<Users />}
                    color="primary"
                  >
                    Users
                  </Nav.Item>
                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    href="/admin/currents"
                    icon={<Wallet />}
                    color="primary"
                  >
                    Currents
                  </Nav.Item>
                  <Nav.Menu
                    title={
                      <div className="flex gap-3">
                        <Combine /> Exchanges
                      </div>
                    }
                  >
                    <Nav.Item>All</Nav.Item>
                    <Nav.Item>Approved</Nav.Item>
                    <Nav.Item>Pending</Nav.Item>
                    <Nav.Item>Refund</Nav.Item>
                    <Nav.Item>Rejected</Nav.Item>
                  </Nav.Menu>
                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    href="/admin/usrsban"
                    key={"ban"}
                    icon={<Ban />}
                    color="primary"
                  >
                    Banned User
                  </Nav.Item>
                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    href="/admin/blogs"
                    icon={<TbBrandBlogger />}
                    color="primary"
                  >
                    Blogs
                  </Nav.Item>
                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    icon={<SiSpeedtest />}
                    color="primary"
                  >
                    Testmonials
                  </Nav.Item>
                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    href="/admin/setting"
                    icon={<Settings />}
                    color="primary"
                  >
                    Setting
                  </Nav.Item>
                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    onClick={handleLogout}
                    icon={<CgLogOut />}
                    color="danger"
                  >
                    Logout
                  </Nav.Item>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </div>
        </main>
      </div>
    
    {/* mobile */}
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left" size="sm">
      <DrawerContent>
        <DrawerBody>
             <div className="">
        <main className="mt-5">
          <div>
            <h1 className="text-2xl font-bold ml-2">Admin Dashboard </h1>
            <hr />
          </div>

          {/* show dashboard */}
          <div>
            <Sidenav>
              <Sidenav.Body >
                <Nav>
                  <Nav.Item
                    style={{ display: "flex",justifyItems:"flex-start",justifyContent:"flex-start", gap: 10 }}
                    href="/admin"
                    icon={<LayoutDashboard />}
                    color="primary"
                  >
                    Dashboard
                  </Nav.Item>

                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    href="/admin/users"
                    icon={<Users />}
                    color="primary"
                  >
                    Users
                  </Nav.Item>
                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    href="/admin/currents"
                    icon={<Wallet />}
                    color="primary"
                  >
                    Currents
                  </Nav.Item>
                  <Nav.Menu
                    title={
                      <div className="flex gap-3">
                        <Combine /> Exchanges
                      </div>
                    }
                  >
                    <Nav.Item>All</Nav.Item>
                    <Nav.Item>Approved</Nav.Item>
                    <Nav.Item>Pending</Nav.Item>
                    <Nav.Item>Refund</Nav.Item>
                    <Nav.Item>Rejected</Nav.Item>
                  </Nav.Menu>
                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    href="/admin/usrsban"
                    key={"ban"}
                    icon={<Ban />}
                    color="primary"
                  >
                    Banned User
                  </Nav.Item>
                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    href="/admin/blogs"
                    icon={<TbBrandBlogger />}
                    color="primary"
                  >
                    Blogs
                  </Nav.Item>
                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    icon={<SiSpeedtest />}
                    color="primary"
                  >
                    Testmonials
                  </Nav.Item>
                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    href="/admin/setting"
                    icon={<Settings />}
                    color="primary"
                  >
                    Setting
                  </Nav.Item>
                  <Nav.Item
                    style={{ display: "flex", gap: 10 }}
                    onClick={handleLogout}
                    icon={<CgLogOut />}
                    color="danger"
                  >
                    Logout
                  </Nav.Item>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </div>
        </main>
      </div>
        </DrawerBody>
      </DrawerContent>

    </Drawer>
    </>
  );
}
