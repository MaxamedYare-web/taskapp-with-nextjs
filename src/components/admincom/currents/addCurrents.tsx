"use client"
import { AddCurrent, uploadCurrentImage } from "@/app/lib/admin/currents"
import { addToast, Button, Card, CardBody, CardHeader, Form, Image, Input, Select, SelectItem, Spinner } from "@heroui/react"
import { Upload } from "lucide-react"
import { redirect } from "next/navigation"
import React, { useEffect, useState, useTransition } from "react"

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


export const AddCurrentsCom = () => {
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

        if(!avatorLink){
            console.log("please upload current image")
            return
        }

    //    data add currents
        const currentsDatas:Icurrents = {
               account_number:String(dataInput.account_number),
               active:Boolean(dataInput.active),
               category:String(dataInput.category),
               code:String(dataInput.code),
               current_name:String(dataInput.current_name),
               img:String(avatorLink),
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
            const result = await AddCurrent(currentData)
            if(result.success){
               
                addToast({
                    title:"Current was Added😍",
                    description:result.message,
                    color:"success"
                })
                redirect("/admin/currents")
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


    return (
        <>
            <main className="p-3">
                <Card>
                    <CardHeader>
                        <h1 className="font-bold">Add Current</h1>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={handleSubmitForm}  className="grid grid-cols-2 gap-3">

                            <Select name="category"
                                color={errorSelectCat ? "danger" : "default"}
                                description={errorSelectCat ? <h1 className="text-danger">{errorSelectCat}</h1> : ""}

                                aria-label="kind current"
                                placeholder="Select fiat or cryoto">
                                <SelectItem key={"fiat"}>fiat</SelectItem>
                                <SelectItem key={"crypto"}>Crypto</SelectItem>
                            </Select>
                            <Input  required errorMessage="Current name is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} name="current_name" label="Current Name" placeholder="like btc or usdt and etc..." />
                            <Input required errorMessage="Current key is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} name="key" label="Current Key" placeholder="like bitcoin or usdt and etc..." />
                            <Input required errorMessage="Symbol is required" name="symbol" label="Symbol" placeholder="like usdt or btc" />
                            <Input required errorMessage="Code is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} name="code" label="Code" placeholder="like '$' or btc" />
                            <Select color={errorSelectStatus ? "danger" : "default"} description={errorSelectStatus ? <h1 className="text-danger-500">{errorSelectStatus}</h1> : ""} aria-label="status select" name="active" placeholder="Select Status">
                                <SelectItem key={"true"}>Publish</SelectItem>
                                <SelectItem key={"false"}>Draft</SelectItem>
                            </Select>
                            <Input required errorMessage="Min is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} type="number" name="min" label="Min" placeholder="current min" />
                            <Input required errorMessage="Max is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} type="number" name="max" label="Max" placeholder="Current max" />
                            <Input name="rate" required errorMessage="Rate is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} type="number" label="Rate" endContent="%" placeholder="Current rate" />
                            <Input name="reverse" required errorMessage="Reverce is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} type="number" label="Reverse" placeholder="Current reverse" />
                            <Input className="col-span-2" required errorMessage="Account number is required" classNames={{ label: "font-semibold text-default-500 text-[18px]" }} type="text" name="account_number" label="Account" placeholder="you account number or address" />
                            <input onChange={handleFileChange} id="file" type="file" className="hidden" />
                            <label htmlFor="file" className="col-span-2 bg-default-200 rounded" >
                                <div className="flex items-center  font-bold text-default-500 h-[100px] justify-center gap-1">
                                    {
                                        avatorLink ? <Image src={avatorLink} height={50} width={50} className="rounded" alt="current image" /> : isPendingCurImage ? <div className="flex items-center gap-1">
                                            <Spinner color="warning" variant="wave" />
                                            <h1>Uploading...</h1>
                                        </div> : <div className="flex items-center gap-1">
                                            <Upload />
                                            <h1>Upload current image </h1>
                                        </div>
                                    }
                                </div>

                            </label>

                            <Button  type="submit" color="primary">
                                {
                                    isPenCurrentData ? <div className="flex items-center gap-1">
                                        <Spinner variant="wave" color="warning"/> Creating...
                                    </div> : "Create Current"
                                }
                                </Button>
                               
                        </Form>

                    </CardBody>
                </Card>

            </main>
        </>
    )



}


