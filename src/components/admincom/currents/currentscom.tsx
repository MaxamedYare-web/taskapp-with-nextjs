"use client"
import { deleteCurrent, getAllCurrents } from "@/app/lib/admin/currents"
import { Button } from "@heroui/button"
import { addToast, Badge, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure, User } from "@heroui/react"
import { Eye, Search, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useCallback, useEffect, useMemo, useState, useTransition } from "react"

interface Icurrents {
    current_name: string
    key: string
    rate: number
    min: number
    max: number
    img: string
    reverse: number
    account_number: string
    code: string
    symbol: string
    category: string,
    active: boolean,
    id:string
}

export const CurrentsCom = ()=>{
 
  const {isOpen,onClose,onOpen,onOpenChange} = useDisclosure()
  const [currentIdConfirm,setCurrentId] = useState<string | null>(null)
  const [isPenCurDel,startCurDel] = useTransition()
  const [isPenCur,startPenCur] = useTransition()
  const [currentsData,setCurrentsData]=  useState<Icurrents[]>([])
  const [currentPage,setCurrentPage]=useState<number>(1)
  const [searchCurfrent,setSearchCurrent] = useState<string>("")
const router = useRouter()
  // column key
  const column = [
    {
      name:"Currents Name",
      key:"name"
    },
    {
      name:"Currents Reverse",
      key:"reverse"
    },
    {
      name:"Currents Status",
      key:"status"
    },
    {
      name:"Currents Kind",
      key:"kind"
    },
    {
      name:"Action",
      key:"action"
    }
  ]

  useEffect(()=>{
    startPenCur(async()=>{
      const result = await getAllCurrents()
      setCurrentsData(result.currents)
    })
  },[])

  // handle delete button
  const handleDeletButton =(currentId:string)=>{
    onOpen()
   setCurrentId(currentId)
  }

  // cornfirm dilete
  const confirmDelete = ()=>{
startCurDel(async()=>{
  const result = await deleteCurrent(currentIdConfirm)
  if(result.success){
    addToast({
      title:"this current was Deleted",
      description:result.message,
      color:"success"
    })
    onOpenChange()
       const reFRESH= await getAllCurrents()
    setCurrentsData(reFRESH.currents)
  }
})
  }

const curretnCeil = useCallback((currents:Icurrents,columnKey:React.Key)=>{
  switch(columnKey){
    case "name":
      return(
        <User classNames={{name:"capitalize"}} name={currents.current_name} 
        avatarProps={{src:String(currents.img),alt:"current image",
          style:{border:"1px solid gray",backgroundColor:"white"}}}
         description={<h1 
          className="uppercase">{currents.symbol}</h1>}/>
      )
      case "reverse":
        return <h1>{currents.code}{currents.reverse}</h1>
        case "status" : 
        return <div>{currents.active ? <Badge color="primary" variant="shadow">Published</Badge> : <h1>Draft</h1>}</div>
        case "kind":
          return <h1>{currents.category}</h1>
          case "action":
            return (
              <div className="flex gap-1 items-center  justify-center">
                <Button as={Link} href={`/admin/currents/${currents?.id}`}  variant="faded" startContent={<Eye/>}>
                   View
                </Button>
                <Button color="danger" onPress={()=>handleDeletButton(currents.id)} startContent={<Trash2/>}>
                   Delete
                </Button>
              </div>
            )
  }

},[])

// currents
const allCurrents = currentsData
const pagePerRows = 7
const pages = Math.ceil(allCurrents.length / pagePerRows)

const currentItem = useMemo(()=>{
    const start = (currentPage - 1) * pagePerRows
    const end = start + pagePerRows
    return allCurrents.slice(start,end)
},[currentPage,allCurrents])


const handleChangeSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const val = e.target.value
  setSearchCurrent(val)
}

const currentItems = currentItem.filter((cur)=>cur.current_name.toLowerCase().includes(searchCurfrent))


return(
    <>
    <main className="p-2 space-y-3 w-full">
        <div className="flex justify-between gap-3 bg-default-50 items-center p-2 rounded">
           <article className="w-full">
             <h1 className="font-semibold text-default-600 text-2xl">Current Lists</h1>
             <p className="font-semibold text-default-500">you can add update delete currents</p>
           </article>
           <Input onChange={handleChangeSearch} endContent={<Search/>} placeholder="Searching current..."/>
           <Button as={Link}  href="/admin/currents/add" color="primary" size="lg">Add New</Button>
        </div>

{/* table currents */}
<Table aria-label="currents labeled"  align="center" className="w-120 md:w-full scroll-auto"
bottomContent={
  <div className="flex justify-center items-center">
    <Pagination
    isCompact
    showShadow
    showControls
    total={pages}
    page={currentPage}
    onChange={(page)=>setCurrentPage(page)}
    />
  </div>
}
>
  <TableHeader>
   {
    column.map((col)=>(
      <TableColumn align={col.key == "action" ? "center" : "start"} key={col.key}>{col.name}</TableColumn>
    ))
   }
  </TableHeader>
  {
 currentItems?.length === 0 ? <TableBody emptyContent="Currents not found you can add new current">
    {[]}
  </TableBody> :
 <TableBody items={currentItems}>
    {
      (cur)=>(
        <TableRow key={cur.key}>
            {
              (col)=><TableCell>{curretnCeil(cur,col)}</TableCell>
              }
        </TableRow> 
      )
    }
 </TableBody>
  }
  

</Table>

{/* modal delet */}
<Modal backdrop="blur" classNames={{backdrop:"bg-primary-500/30"}} isOpen={isOpen} onOpenChange={onOpenChange}>
<ModalContent>
    <ModalHeader>
    <h1>Delete Current</h1>
  </ModalHeader>
  <ModalBody>
    if you need to delete this current if yes click Delete or close to close
    remember if you clcik delete this current will deleted
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onPress={onClose}>Close</Button>
    <Button isLoading={isPenCurDel} onPress={confirmDelete} color="danger">
      {
        isPenCurDel ? "Deleting..." : "Delete"
      }
      </Button>
  </ModalFooter>
</ModalContent>
</Modal>

    </main>
    
    </>
)


}




