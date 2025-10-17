"use client"
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, Listbox, ListboxItem } from "@heroui/react"
import { Settings } from "lucide-react"
import { MdDashboard } from "react-icons/md"


export const 
SideBarDash = ({isOpen,onOpenChange}:{isOpen:boolean,onOpenChange:()=>void})=>{




return (
    <>
    <main className="w-[240px] bg-default-50 min-h-screen hidden md:block">
      <div className="border-b-1 mt-10">
         <h1 className="p-2">Menu Dashboard</h1>
      </div>
 <Listbox aria-label="list box dashboard">
    <ListboxItem href="/dashboard" startContent={<MdDashboard/>}>
        Dashboard
    </ListboxItem>
    <ListboxItem href="/dashboard/profile" startContent={<Settings/>}>
       Setting
    </ListboxItem>
 </Listbox>
    </main>
   
    <Drawer size="xs" placement="left" isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
         {
            (onClose)=>(
               <>
               <DrawerBody>
                    <main className="w-full ">
      <div className="border-b-1 mt-10">
         <h1 className="p-2">Menu Dashboard</h1>
      </div>
 <Listbox aria-label="list box dashboard">
    <ListboxItem href="/dashboard" startContent={<MdDashboard/>}>
        Dashboard
    </ListboxItem>
    <ListboxItem href="/dashboard/profile" startContent={<Settings/>}>
       Setting
    </ListboxItem>
 </Listbox>
    </main>
               </DrawerBody>
               <DrawerFooter>
                  <Button onPress={onClose}>Close</Button>
                  <Button color="danger" variant="flat">Logout</Button>
               </DrawerFooter>
               </>
               
            )
         }
      </DrawerContent>
    </Drawer>
    
    </>
)

}










