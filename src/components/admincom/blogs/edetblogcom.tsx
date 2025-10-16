"use client"

import React, { useEffect, useState, useTransition } from "react"
import { useDataAdmin } from "../utils/contextProvider"
import { addToast, Button, Card, CardBody, CardHeader, Form, Image, Input, Select, SelectItem, Spinner, Textarea } from "@heroui/react"
import { Upload } from "lucide-react"
import { updateBlog } from "@/app/lib/admin/blogs"
import useUploadImage from "@/app/lib/admin/upload"

interface EditIBlog{
    id:string
}

interface IGetBlog {
        getBlogs:[]
}

interface IsingleB{
      id:string,
      titile:string,
      description:string,
      avator:string,
      published:string,
      updatedAt:string,
      category:string,
      delet_url_hash:string



}

interface IimageApi {
   delet_url_hash:string,
  display_url:string

}

export const EditBlog = ({id}:EditIBlog)=>{
const [isPending,startTransition] = useTransition()
const [isPendingUp,startTransitionUp] = useTransition()
const [isPendingUpload,startTransitionUpload] = useTransition()
const {fetchBlogs} = useDataAdmin()
const [singleBlog,setSingleBlog] = useState<IsingleB>()
const {UploadFile} = useUploadImage()
const [avatorUpdate,setAvatorUpdate] = useState<IimageApi | null>(null)

useEffect(()=>{
    startTransition(async()=>{
        const result:IGetBlog | any = await fetchBlogs()
        const blog:IsingleB[] = result?.getBlogs
         blog.filter((b)=>b?.id  == id).map((b)=>{
            setSingleBlog(b)
        })
  
    })
},[])

if(isPending){
    return <div><h1>Pending...</h1></div>
}

// handle submit form
const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.currentTarget))
  const inputData ={
     titile : data.title ,
        description:data.description,
        published:data.status,
        avator:avatorUpdate?.display_url ? avatorUpdate.display_url : singleBlog?.avator,
        category:data.category,
        delet_url_hash:avatorUpdate?.delet_url_hash ? avatorUpdate.delet_url_hash : singleBlog?.delet_url_hash

  }



  startTransitionUp(async()=>{
    const result:any = await updateBlog(id,inputData)
   addToast({
    title:"Successfully Updated",
    description:result.data.message,
    color:"success",
    timeout:3000,
    shouldShowTimeoutProgress:true
   })
  })
}

// handle change file
const handleChangeFile = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.item(0)
    startTransitionUpload(async()=>{
        const result = await UploadFile(file)

         setAvatorUpdate({
            display_url:result.display_url,
            delet_url_hash:result.delet_hash_url
         })

    })
  

}


return (
    <>
    
       <main className="p-2">
            <Card aria-label="edit blog">
                <CardHeader className="flex flex-col items-start">
                    <h1 className="font-bold">Edit Blog</h1>
                    <p className="font-bold text-default-400">to edit this blog fill all the form</p>
                </CardHeader>
                <CardBody aria-label="form body">
                    <Form onSubmit={handleSubmit} className="lg:grid grid-cols-2 gap-3">
                      <Input
                      defaultValue={singleBlog?.titile}
                      required
                      classNames={{
                        label:"font-bold"
                      }}
                      errorMessage="Title is requred"
                      name="title" label="Title"/>
                   
                       <Select 
                      aria-label="select category"
                      name="category"
                       defaultSelectedKeys={[String(singleBlog?.category)]}
                       required
                       errorMessage="Please select at least one catogory"
                       placeholder="Select Category" className="w-1/2">
                        <SelectItem key="learn">Learn</SelectItem>
                        <SelectItem key={"motivication"}>Motivication</SelectItem>
                        <SelectItem key={"devlopment"}>Devlopment</SelectItem>
                        <SelectItem key={"crypto"}>Crypto</SelectItem>
                      </Select>
                      <Textarea
                        classNames={{
                        label:"font-bold"
                      }}
                      defaultValue={singleBlog?.description}
                      required
                      errorMessage="Descrition is required please fill"
                      className="col-span-2" label="Description" isClearable name="description"/>
                        <Input id="file" onChange={handleChangeFile} className="hidden" name="file" type="file"/>
                       <div className="col-span-2 flex items-center gap-2">
                        {
                            isPendingUpload ? <label htmlFor="file" className={`flex items-center bg-primary-200
                             text-default-100 rounded-lg  p-2 w-35 gap-1`}>
                            <Spinner color="primary" variant="wave"/> Updating...
                         </label> : <label htmlFor="file" className={`flex items-center bg-primary-500
                             text-default-100 rounded-lg  p-2 w-35 gap-1`}>
                            <Upload/> Update File
                         </label>
                        }
                          
                         <Image className="w-20 h-10 rounded" src={avatorUpdate?.display_url ? avatorUpdate.display_url : singleBlog?.avator}/>
                       </div>
                         <Select
                         name="status"
                         aria-label="select published"
                         defaultSelectedKeys={[String(singleBlog?.published)]}
                         required
                         errorMessage="Please select Status"
                         placeholder="Select Status" className="w-1/2 col-span-2">
                            <SelectItem key={"published"}>
                                  Published
                            </SelectItem>
                            <SelectItem key={"draft"}>
                                 Draft
                            </SelectItem>
                         </Select>
                         <Button type="submit"  className={`w-1/3 text-danger-50 ${isPendingUp ? "bg-primary-200" : "bg-primary-500 "}`}>
                         {
                            isPendingUp ? <div className="flex items-center gap-1">
                                <Spinner color="primary" variant="spinner"/>
                                <h1>Blog Updating...</h1>
                            </div> : " Update Blog"
                         }
                        </Button>
                    </Form>
                </CardBody>
            </Card>

        </main>
    
    </>
)


}



