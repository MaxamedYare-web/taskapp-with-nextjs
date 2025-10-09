"use client"
import { Card, CardBody, CardHeader, Form,Input } from "@heroui/react"


export const AddBlog = ()=>{
    return (
        <>
        <main className="p-3">
           <Card>
            <CardHeader className="flex flex-col justify-start items-start">
                <h1 className="font-bold">Create Blog</h1>
                <p className="font-semibold text-gray-500">add blog and  select Publish or Draft</p>
            </CardHeader>
            <CardBody>
                <Form>
                    <Input label="Title" labelPlacement="outside"/>
                </Form>
            </CardBody>
           </Card>
        </main>
        </>
    )
}

