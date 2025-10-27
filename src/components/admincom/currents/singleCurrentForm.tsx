import { updateCurrents, uploadCurrentImage } from "@/app/lib/admin/currents"
import { addToast, Button, Card, CardBody, CardHeader, Input, Select, SelectItem, Spinner,Image, Form, Skeleton, Avatar } from "@heroui/react"
import { Upload } from "lucide-react"
import { useEffect, useState, useTransition } from "react"

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
    id?:string
}

export const SingleCurrentForm = ({id,singleCurrent,isPending}:{id:string,singleCurrent:Icurrents,isPending:boolean})=>{
   const [errorSelectCat, setErorSelectCat] = useState<string>("")
    const [errorSelectStatus, setErorSelectStatus] = useState<string>("")
    const [isPendingCurImage, startCurImage] = useTransition()
    const [avatorLink, setAvatorLine] = useState<string | null>(null)
    const [isPenCurrentData,startCurrentData] = useTransition()
    const [currentData,setCurrentData] = useState<Icurrents | null>(null)


   const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const dataInput = Object.fromEntries(new FormData(e.currentTarget))
        if (dataInput.category == "") {
            e.currentTarget.focus()
            setErorSelectCat("Please select if this current fiat or Crypto")
            return

        } else {
            setErorSelectCat("")
        }
        if (dataInput.active == "") {
            setErorSelectStatus("Please select Status")
            return
        } else {
            setErorSelectStatus("")
        }

         let isActive = dataInput.active == "pub" ? true : false as boolean
        
    //    data add currents
        const currentsDatas:Icurrents = {
               account_number:String(dataInput.account_number),
               active:isActive,
               category:String(dataInput.category),
               code:String(dataInput.code),
               current_name:String(dataInput.current_name),
               img:avatorLink ? String(avatorLink) : String(singleCurrent.img),
               key:String(dataInput.key),
               max:Number(dataInput.max),
               min:Number(dataInput.min),
               rate:Number(dataInput.rate),
               reverse:Number(dataInput.reverse),
               symbol:String(dataInput.symbol)
        }
        setCurrentData(currentsDatas)
          

    }

        useEffect(()=>{
            
         if(currentData){
        
        startCurrentData(async()=>{
            const result = await updateCurrents(id,currentData)
            if(result.success){
               
                addToast({
                    title:"Current was Updated😍",
                    description:result.message,
                    color:"success"
                })
              
            }
              setCurrentData(null)
       
        })
    }
    },[currentData,startCurrentData])

        // handfle chanmge file upload current image
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.item(0)
            startCurImage(async () => {
                const result = await uploadCurrentImage(file)
                const desplay_url = result.desplay_url
                if (!desplay_url) {
                    addToast({
                        title: "failed with upload",
                        description: "there is error with uploading please try again",
                        color: "danger"
    
                    })
    
                }
                setAvatorLine(result.desplay_url)
            })
    
        }

      

    return(
           <Card>
                    <CardHeader>
                        <h1 className="font-bold">Add Current</h1>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={handleSubmitForm}  className="grid grid-cols-2 gap-3">

                       <Skeleton isLoaded={!isPending} className="rounded-2xl">
                             <Select name="category"
                             defaultSelectedKeys={[singleCurrent?.category]}
                                color={errorSelectCat ? "danger" : "default"}
                                description={errorSelectCat ? <h1 className="text-danger">{errorSelectCat}</h1> : ""}

                                aria-label="kind current"
                                placeholder="Select fiat or cryoto">
                                <SelectItem key={"fiat"}>fiat</SelectItem>
                                <SelectItem key={"crypto"}>Crypto</SelectItem>
                            </Select>
                       </Skeleton>
                           <Skeleton isLoaded={!isPending} className="rounded-2xl">
                             <Input defaultValue={singleCurrent?.current_name}  required errorMessage="Current name is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} name="current_name" label="Current Name" placeholder="like btc or usdt and etc..." />
                           </Skeleton>

                           <Skeleton isLoaded={!isPending} className="rounded-2xl">
                             <Input defaultValue={singleCurrent?.key} required errorMessage="Current key is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} name="key" label="Current Key" placeholder="like bitcoin or usdt and etc..." />
                           </Skeleton>
                           <Skeleton isLoaded={!isPending} className="rounded-2xl">
                              <Input defaultValue={singleCurrent?.symbol} required errorMessage="Symbol is required" name="symbol" label="Symbol" placeholder="like usdt or btc" />
                           </Skeleton>
  <Skeleton isLoaded={!isPending} className="rounded-2xl">
                                <Input defaultValue={singleCurrent?.code} required errorMessage="Code is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} name="code" label="Code" placeholder="like '$' or btc" />
  </Skeleton>
                           <Skeleton isLoaded={!isPending} className="rounded-2xl">
                             <Select defaultSelectedKeys={[String(singleCurrent?.active)== "true" ? "pub" : "draf"]}
                              color={errorSelectStatus ? "danger" : "default"} 
                              description={errorSelectStatus ? <h1 className="text-danger-500">{errorSelectStatus}</h1> : ""} 
                              aria-label="status select" name="active" placeholder="Select Status">
                                <SelectItem key={"pub"}>Publish</SelectItem>
                                <SelectItem key={"draf"}>Draft</SelectItem>
                            </Select>
                           </Skeleton>
                           <Skeleton isLoaded={!isPending} className="rounded-2xl">
                             <Input defaultValue={String(singleCurrent?.min)} required errorMessage="Min is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} type="number" name="min" label="Min" placeholder="current min" />
                           </Skeleton>
                           <Skeleton isLoaded={!isPending} className="rounded-2xl">
                             <Input defaultValue={String(singleCurrent?.max)} required errorMessage="Max is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} type="number" name="max" label="Max" placeholder="Current max" />
                           </Skeleton>
                            <Skeleton isLoaded={!isPending} className="rounded-2xl">
                                <Input defaultValue={String(singleCurrent?.rate)} name="rate" required errorMessage="Rate is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} type="number" label="Rate" endContent="%" placeholder="Current rate" />
                            </Skeleton>
                           <Skeleton isLoaded={!isPending} className="rounded-2xl">
                             <Input defaultValue={String(singleCurrent?.reverse)} name="reverse" required errorMessage="Reverce is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} type="number" label="Reverse" placeholder="Current reverse" />
                           </Skeleton>
                           <Skeleton isLoaded={!isPending} className="rounded-2xl col-span-2">
                             <Input defaultValue={singleCurrent?.account_number} required errorMessage="Account number is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} type="text" name="account_number" label="Account" placeholder="you account number or address" />
                           </Skeleton>
                            <input onChange={handleFileChange} id="file" type="file" className="hidden" />
                           <Skeleton  className="rounded  col-span-2" isLoaded={!isPending}>
                             <label htmlFor="file"   >
                                <div className="flex items-center bg-default-200 rounded font-bold text-default-500 h-[100px] justify-center gap-1">
                                    {
                                        avatorLink ? <Image src={avatorLink} height={50} width={50} className="rounded" alt="current image" /> : isPendingCurImage ? <div className="flex items-center gap-1">
                                            <Spinner color="warning" variant="wave" />
                                            <h1>Uploading...</h1>
                                        </div> : <div className="flex items-center gap-1">
                                           <Avatar src={avatorLink ? avatorLink : singleCurrent?.img}/>
                                        </div>
                                    }
                                </div>

                            </label>
                           </Skeleton>

                           <Skeleton className="rounded-full" isLoaded={!isPending}>
                             <Button  type="submit" color="primary">
                                {
                                    isPenCurrentData ? <div className="flex items-center gap-1">
                                        <Spinner variant="wave" color="warning"/> Updating...
                                    </div> : "Update Current"
                                }
                                </Button>
                           </Skeleton>
                               
                        </Form>

                    </CardBody>
                </Card>
    )
}



