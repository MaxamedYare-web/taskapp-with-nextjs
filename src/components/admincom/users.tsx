"use client"

import { useAdminAuth } from "@/app/lib/admin/adminauth"
import { Button, Input } from "@heroui/react"
import { Search } from "lucide-react"


export const UsrsCom = ()=>{



    return (
       
        <main className="w-full space-y-3 flex-col">
            <div className="flex bg-secondary-50 rounded justify-between items-center p-3 w-full ">
                <h1 className="font-bold text-gray-600 text-2xl">Users</h1>
                <div>
                    <Input placeholder="Searching" 
                    startContent={<Search/>}
                    />
                </div>
            </div>

     <div className="bg-secondary-50 rounded">
        tool
     </div>

        </main>
        
      
    )


}




