"use client"
import { blogDelAction } from "@/actions/blogdelete"
import { AddBlogs, getBlogs } from "@/app/lib/admin/blogs"
import useUploadImage from "@/app/lib/admin/upload"
import { Button } from "@heroui/button"
import { addToast, Chip, Form, Image, Input, Modal, ModalBody, 
  ModalContent, ModalFooter, ModalHeader, Pagination, Select, SelectItem, Spinner, 
  Table, TableBody, TableCell, TableColumn, TableHeader,
   TableRow, Textarea, useDisclosure, User } from "@heroui/react"
import { formatDistance } from "date-fns"

import { Delete, DeleteIcon, Edit, Trash, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState, useTransition } from "react"


interface IGetBlogs {
  titile:string,
  description:string,
  published:string,
  avator:string,
  id:number,
  createdAt:string,
  category:string

}

interface IimageApi {
  delet_hash_url:string,
  display_url:string

}


export const Blogscom = ()=>{
const {isOpen,onOpen,onOpenChange,onClose} = useDisclosure()
const [isPending,startTransition] = useTransition()
const [isPendingBlog,startTransitionBlog] = useTransition()
const [isPendingGetBlogs,startGetBlogs]= useTransition()
const [isPendingDelBlog,startDelBlog]= useTransition()
const [currentPage,setCurrentPage] = useState<number>(1)
const {UploadFile} = useUploadImage()
    const router = useRouter()
const [isOpenDelet,setIopenDelete] = useState<boolean>(false)
const [avatorLink,setAvatorLink] = useState<IimageApi | null>(null)
const [blogData,setBlogData] = useState<IGetBlogs[]>([])
const [isDeleted,setIsDeleted] = useState<boolean>(false)
const [errorMes,setErrorMes] = useState({
    title:"",
    description:"",
    status:"",
    category:""
})
const [blogId,setBlogId] = useState<number | null>(null)
const [fileErr,setFileErr] = useState(true)
const [addedBlog,setAddedBlog] = useState(false)

// handle change form file
const handleChangeFile = (e:React.ChangeEvent<HTMLInputElement>)=>{

 const dataFile = e.target.files?.item(0) || null
   if(dataFile){
     setFileErr(false)
   }

 
 startTransition(async()=>{
   const result =  await UploadFile(dataFile)
   console.log(result)
   setAvatorLink({
    display_url:result.display_url,
    delet_hash_url:result.delet_hash_url
   })
 })


}

// handle submit form
const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault()
   const data = Object.fromEntries(new FormData(e.currentTarget))

   if(!data.title || !data.description || !data.status || !avatorLink || !data.category){
     addToast({
        timeout:5000,
        title:"Please fill all input",
        description:"All input is required please fill",
        color:"danger",
        shouldShowTimeoutProgress:true
     })
     return

   }

   const dataInput ={
    titile:data.title,
    description:data.description,
    published:data.status,
    avator:avatorLink.display_url,
    delet_url_hash:avatorLink.delet_hash_url, 
    category:data.category
   }
   startTransitionBlog(async()=>{
    const result = await AddBlogs(dataInput)
    if(!result?.success){
      addToast({
        title:"failed",
        description:"this blog not created please try again if you incountry more error please contact you devloper",
        color:"danger",
        timeout:5000,
        shouldShowTimeoutProgress:true
      })
    }
    if(result?.success){
      setAddedBlog((prev)=>!prev)
      addToast({
        title:"Conguration😍",
        description:`this blog title ${result.addBlog.titile} was created successfully`,
        color:"success",
        timeout:3000,
        shouldShowTimeoutProgress:true
      })
     onClose()

     setErrorMes({
       title:"",
    description:"",
    status:"",
    category:""
     })
     setAvatorLink(null)
    }
   })

}


const handleChangeValue = (e:React.ChangeEvent<HTMLInputElement>)=>{
 const {name,value} = e.target
 setErrorMes({
    ...errorMes,
    [name]: value
 })

}

const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>)=>{
   const {name,value} = e.target
   setErrorMes({
    ...errorMes,
    [name]:value
   })
}

// get all blogs
useEffect(()=>{
  startGetBlogs(async()=>{
    const result = await getBlogs()
    setBlogData(result.getBlogs)
 
  })

},[addedBlog,isDeleted])


const column = [
  {
    key:"info",
    label:"Info"
  },
  {
    key:"createdAt",
    label:"CreatedAt"
  },
  {
    key:"cat",
    label:"Category"
  },
  {
    key:"status",
    label:"Status"
  },
  {
    key:"action",
    label:"Action"
  },
]

// DELETE BLOG
const handleDeletBlog = (id:number)=>{
setBlogId(id)
  setIopenDelete(true)

}

// yes to delete button
const handleYesDelete = ()=>{


  startDelBlog(async()=>{
    const result = await blogDelAction(blogId)
    router.refresh()
    setIsDeleted((prev)=>!prev)
    if(result.deletBlogFun.message){
        setIopenDelete(false)
       addToast({
        title:"Hambalyo Conguration😋",
        description:result.deletBlogFun.message,
        color:"success",
        timeout:4000,
        shouldShowTimeoutProgress:true
       })
    }
 
  })

}


const blogCeil = useCallback((blog:IGetBlogs,columkey:React.Key)=>{
    const ceilValue = blog?.[columkey as keyof IGetBlogs]

  switch(columkey){
    case "info" :
      return (
        <div className="flex items-center gap-2">
          <Image className="w-15 h-10 rounded" src={blog.avator}/>
          <article>
            <h1 className="font-semibold text-[15px] capitalize text-default-500">{blog.titile}</h1>
           
          </article>
        </div>
      )
      case "createdAt":
        return <h1>{formatDistance(new Date(blog.createdAt),new Date(),{addSuffix:true})}</h1>
        case "cat":
          return <h1>{blog.category}</h1>
          case "status" : 
            return (
              <div>
                
                <Chip size="sm"  color={blog.published == "draft" ? "danger" : "success" } variant="light" className="capitalize font-bold">
                  <Chip variant="dot" classNames={{
                    base:"bg-none border-0"
                  }} color={blog.published == "draft" ? "danger" : "success" } size="sm"/>
{blog.published}
                </Chip>
              
              </div>
            )
        case "action":
          return (
            <div className="flex items-center gap-1">
              <Button as={Link} href={`/admin/blogs/${blog.id}`} size="sm" color="success" variant="flat" className="flex items-center gap-1">
                <Edit/>
                Edit
              </Button>
              <Button onPress={()=>handleDeletBlog(blog.id)} size="sm" color="danger" variant="flat" className="flex items-center gap-1">
                <Trash/>
                Delete
              </Button>
            </div>
          )
          default :
          return ceilValue
  }

},[])



useEffect(()=>{

  if(isDeleted){
    router.refresh()
  }

},[isDeleted])



const pagePerRows = 7

 const pages = Math.ceil(blogData ? blogData?.length / pagePerRows : 0)

const itemsBlog = useMemo(()=>{

  const start = (currentPage - 1) * pagePerRows
  const end = start + pagePerRows
  return blogData?.slice(start,end)
},[currentPage,blogData,isDeleted])


if(isPendingGetBlogs){
  return <h1>laoding with get blogs</h1>
}

if(!itemsBlog || itemsBlog?.length === 0){

 return (
         <main className="p-3">
           <div className="flex justify-between items-center p-2 bg-white rounded">
            <article>
                <h1 className="font-bold">Blogs</h1>
                <p className="font-semibold text-gray-500">see all blogs and add new</p>
            </article>
            <Button onPress={onOpen} color="primary">Add New</Button>
           </div>
       
        <Table aria-label="table blogs" className="mt-4 w-lg md:w-full" 
   
        >
          <TableHeader>
            {
              column.map((col)=>(
                <TableColumn align={col.key == "action" ? "center":"start" } key={col.key}>{col.label}</TableColumn>
              ))
            }
          </TableHeader>
  
         <TableBody emptyContent="there is no found blog">{[]}</TableBody> 
        
      
        </Table>
        {/* model create blog or add blog */}
       <Modal aria-label="form blogs" backdrop="blur" classNames={{
        backdrop:"bg-primary-500/30"
       }} isOpen={isOpen}  onOpenChange={onOpenChange}>
        <ModalContent>
           
 <ModalHeader aria-label="modal header" className="flex flex-col">
     <h1 className="font-bold">Create Blog</h1>
                <p className="font-semibold text-gray-500">add blog and  select Publish or Draft</p>
 </ModalHeader>
          
            <ModalBody aria-label="model body">
                 
         
                <Form aria-label="from input" className=" " onSubmit={handleSubmit}>
                    <Input
                    isInvalid={!errorMes.title}
                    onChange={handleChangeValue}
                    color={!errorMes.title ? "danger" : "success"}
                    errorMessage="Title is required..."
                    name="title" classNames={{
                        label:"font-semibold"
                    }} label="Title" labelPlacement="outside"/>
                    <Select
                    aria-label="select status"
                    isInvalid={!errorMes.status}
                    color={!errorMes.status ? "danger" : "success"}
                      onChange={handleSelect}
                    errorMessage="Please select Status"
                    name="status" className=" mt-5" placeholder="Select Status">
                        <SelectItem key={"published"}>Published</SelectItem>
                        <SelectItem key={"draft"}>Draft</SelectItem>
                    </Select>
                    <div className=" mt-2  w-full flex items-center gap-3">
                      <Input
                      disabled={isPending} onChange={handleChangeFile} name="file" id="file" type="file" className="hidden"/>
                      {
                        isPending ?  <label  htmlFor="file" className="flex gap-1
                       items-center  duration-500
                        p-3 rounded-2xl bg-primary-200 w-36 text-default-50">
                         <Spinner color="primary" variant="simple"/> <p>Uploading...</p>
                      </label> :  <label  htmlFor="file" className={`flex gap-1
                       items-center  duration-500
                        p-3 rounded-2xl 
                        ${fileErr ?
                         "text-danger-500 bg-danger-100": "text-default-50 bg-primary-500"} w-36 `}>
                         <Upload/> <p>Upload File</p>
                      </label>
                      }
                      {
                        avatorLink && <Image className="w-20 h-13 rounded" alt="prev" src={avatorLink.display_url}/>
                     
                      }
                     
                    </div>
                    <Textarea
                    color={!errorMes.description ? "danger" : "success"}
                    isInvalid={!errorMes.description}
                      onChange={handleChangeValue}
                    errorMessage="Description is required"
                    name="description" isClearable className="col-span-2" label="Description"/>
                       <Select
                    
                    aria-label="select status"
                    isInvalid={!errorMes.category}
                    color={!errorMes.category ? "danger" : "success"}
                      onChange={handleSelect}
                    errorMessage="Please select Category"
                    name="category" className=" mt-5 max-w-[185px]"
                     placeholder="Select Category">
                        <SelectItem key={"devlopment"}>Devlopment</SelectItem>
                        <SelectItem key={"crypto"}>Crypto</SelectItem>
                        <SelectItem key={"learn"}>learn</SelectItem>
                        <SelectItem key={"motivication"}>Motivication</SelectItem>
                    </Select>
                   <Button type="submit" className={`text-default-50 ${isPendingBlog ? "bg-primary-200" : "bg-primary-500 "}`}>
                    {
                        isPendingBlog ? <div className={`flex
                         items-center  gap-2`}>
                           <Spinner  variant="wave"/> Creating...
                        </div>:"Create"
                    }
                    
                    </Button>
                </Form>

            </ModalBody>
        </ModalContent>
       </Modal>

          </main>
        )
}

   if(itemsBlog){
 
     return (
        <>
        <main className="p-3">
           <div className="flex justify-between items-center p-2 bg-white rounded">
            <article>
                <h1 className="font-bold">Blogs</h1>
                <p className="font-semibold text-gray-500">see all blogs and add new</p>
            </article>
            <Button onPress={onOpen} color="primary">Add New</Button>
           </div>
        
        {/* table */}
        <Table aria-label="table blogs" className="mt-4 w-lg md:w-full" 
        bottomContent={
          <div className="flex  items-center w-full justify-center">
            <Pagination
            isCompact
            showControls
            showShadow
            page={currentPage}
            total={pages}
            color="primary"
            onChange={(page)=>setCurrentPage(page)}
            />
          </div>
        }
        >
          <TableHeader>
            {
              column.map((col)=>(
                <TableColumn align={col.key == "action" ? "center":"start" } key={col.key}>{col.label}</TableColumn>
              ))
            }
          </TableHeader>
         {
          blogData?.length == 0 ? <TableBody emptyContent="there is no found blog">{[]}</TableBody> : 
           <TableBody items={itemsBlog}>{
             (item)=> (
              <TableRow key={item.id}>{
                (columkey)=> <TableCell>{blogCeil(item,columkey)}</TableCell>
                }
              </TableRow>
             )
            
            }</TableBody>
         }
        </Table>
           
        </main>

{/* model create blog or add blog */}
       <Modal aria-label="form blogs" backdrop="blur" classNames={{
        backdrop:"bg-primary-500/30"
       }} isOpen={isOpen}  onOpenChange={onOpenChange}>
        <ModalContent>
           
 <ModalHeader aria-label="modal header" className="flex flex-col">
     <h1 className="font-bold">Create Blog</h1>
                <p className="font-semibold text-gray-500">add blog and  select Publish or Draft</p>
 </ModalHeader>
          
            <ModalBody aria-label="model body">
                 
         
                <Form aria-label="from input" className=" " onSubmit={handleSubmit}>
                    <Input
                    isInvalid={!errorMes.title}
                    onChange={handleChangeValue}
                    color={!errorMes.title ? "danger" : "success"}
                    errorMessage="Title is required..."
                    name="title" classNames={{
                        label:"font-semibold"
                    }} label="Title" labelPlacement="outside"/>
                    <Select
                    aria-label="select status"
                    isInvalid={!errorMes.status}
                    color={!errorMes.status ? "danger" : "success"}
                      onChange={handleSelect}
                    errorMessage="Please select Status"
                    name="status" className=" mt-5" placeholder="Select Status">
                        <SelectItem key={"published"}>Published</SelectItem>
                        <SelectItem key={"draft"}>Draft</SelectItem>
                    </Select>
                    <div className=" mt-2  w-full flex items-center gap-3">
                      <Input
                      disabled={isPending} onChange={handleChangeFile} name="file" id="file" type="file" className="hidden"/>
                      {
                        isPending ?  <label  htmlFor="file" className="flex gap-1
                       items-center  duration-500
                        p-3 rounded-2xl bg-primary-200 w-36 text-default-50">
                         <Spinner color="primary" variant="simple"/> <p>Uploading...</p>
                      </label> :  <label  htmlFor="file" className={`flex gap-1
                       items-center  duration-500
                        p-3 rounded-2xl 
                        ${fileErr ?
                         "text-danger-500 bg-danger-100": "text-default-50 bg-primary-500"} w-36 `}>
                         <Upload/> <p>Upload File</p>
                      </label>
                      }
                      {
                        avatorLink && <Image className="w-20 h-13 rounded" alt="prev" src={avatorLink.display_url}/>
                     
                      }
                     
                    </div>
                    <Textarea
                    color={!errorMes.description ? "danger" : "success"}
                    isInvalid={!errorMes.description}
                      onChange={handleChangeValue}
                    errorMessage="Description is required"
                    name="description" isClearable className="col-span-2" label="Description"/>
                       <Select
                    
                    aria-label="select status"
                    isInvalid={!errorMes.category}
                    color={!errorMes.category ? "danger" : "success"}
                      onChange={handleSelect}
                    errorMessage="Please select Category"
                    name="category" className=" mt-5 max-w-[185px]"
                     placeholder="Select Category">
                        <SelectItem key={"devlopment"}>Devlopment</SelectItem>
                        <SelectItem key={"crypto"}>Crypto</SelectItem>
                        <SelectItem key={"learn"}>learn</SelectItem>
                        <SelectItem key={"motivication"}>Motivication</SelectItem>
                    </Select>
                   <Button type="submit" className={`text-default-50 ${isPendingBlog ? "bg-primary-200" : "bg-primary-500 "}`}>
                    {
                        isPendingBlog ? <div className={`flex
                         items-center  gap-2`}>
                           <Spinner  variant="wave"/> Creating...
                        </div>:"Create"
                    }
                    
                    </Button>
                </Form>

            </ModalBody>
        </ModalContent>
       </Modal>

       {/* model delete blog */}
       <Modal  backdrop="blur" classNames={{
        backdrop:"bg-primary-500/40",
        closeButton:"hidden"
       }} isOpen={isOpenDelet} onOpenChange={()=>setIopenDelete(false)}>
       <ModalContent>
         <ModalHeader className="flex flex-col">
          <h1 className="font-bold">Delet This Blog</h1>
        
        </ModalHeader>
        <ModalBody>
        <p className="font-semibold text-default-400">to delete this blog click button Yes or button red to close
         remember if you click yes this blog will be delete
        </p>
        </ModalBody>
        <ModalFooter>
          <Button onPress={()=>setIopenDelete(false)} color="danger">Close</Button>
          <Button onPress={handleYesDelete} color="primary">
            {
              isPendingDelBlog ? <div className="flex items-center gap-1"><Spinner color="danger" variant="simple"/> Deleting...</div>:"Yes"
            }
           </Button>
        </ModalFooter>
       </ModalContent>

       </Modal>
        
        </>
    )
   }

   

}



