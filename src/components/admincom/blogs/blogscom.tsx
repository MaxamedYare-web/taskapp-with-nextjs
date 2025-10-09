"use client"
import { Button } from "@heroui/button"
import Link from "next/link"

export const Blogscom = ()=>{

    return (
        <>
        <main className="p-3">
           <div className="flex justify-between items-center p-2 bg-white rounded">
            <article>
                <h1 className="font-bold">Blogs</h1>
                <p className="font-semibold text-gray-500">see all blogs and add new</p>
            </article>
            <Button as={Link} href="/admin/addblog" color="primary">Add New</Button>
           </div>
        </main>
        
        </>
    )
}



