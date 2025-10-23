"use client"
import { getAllCurrents } from "@/app/lib/admin/currents"
import { Button } from "@heroui/button"
import { Badge, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@heroui/react"
import Link from "next/link"
import { useCallback, useEffect, useState, useTransition } from "react"

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
    active: boolean
}

export const CurrentsCom = ()=>{
  const [isPending,startTransition] = useTransition()
  const [currentsData,setCurrentsData] = useState<Icurrents[]>([])

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
    startTransition(async()=>{
      const result = await getAllCurrents()
      setCurrentsData(result.currents)
     
    })
  },[startTransition])
  console.log(currentsData)


const curretnCeil = useCallback((currents:Icurrents,columnKey:React.Key)=>{
  switch(columnKey){
    case "name":
      return(
        <User classNames={{name:"capitalize"}} name={currents.current_name} 
        avatarProps={{src:String(currents.img),alt:"current image",
          style:{border:"1px solid blue"}}}
         description={<h1 
          className="uppercase ">{currents.symbol}</h1>}/>
      )
      case "reverse":
        return <h1>{currents.code}{currents.reverse}</h1>
        case "status" : 
        return <div>{currents.active ? <Badge color="primary" variant="shadow">Published</Badge> : <h1>Draft</h1>}</div>
  }

},[])



return(
    <>
    <main className="p-2 space-y-3">
        <div className="flex justify-between bg-default-50 items-center p-2 rounded">
           <article>
             <h1 className="font-semibold text-default-600 text-2xl">Current Lists</h1>
             <p className="font-semibold text-default-500">you can add update delete currents</p>
           </article>
           <Button as={Link}  href="/admin/currents/add" color="primary" size="lg">Add New</Button>
        </div>

{/* table currents */}
<Table aria-label="currents labeled">
  <TableHeader>
   {
    column.map((col)=>(
      <TableColumn key={col.key}>{col.name}</TableColumn>
    ))
   }
  </TableHeader>
  {
 currentsData.length === 0 ? <TableBody emptyContent="Currents not found you can add new current">
    {[]}
  </TableBody> :
 <TableBody items={currentsData}>
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


    </main>
    
    </>
)


}




