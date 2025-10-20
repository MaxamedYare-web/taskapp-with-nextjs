"use client"
import { Button } from "@heroui/button"
import Link from "next/link"

export const CurrentsCom = ()=>{
return(
    <>
    <main className="p-2">
        <div className="flex justify-between bg-default-50 items-center p-2 rounded">
           <article>
             <h1 className="font-semibold text-default-600 text-2xl">Current Lists</h1>
             <p className="font-semibold text-default-500">you can add update delete currents</p>
           </article>
           <Button as={Link}  href="/admin/currents/add" color="primary" size="lg">Add New</Button>
        </div>
    </main>
    
    </>
)


}




