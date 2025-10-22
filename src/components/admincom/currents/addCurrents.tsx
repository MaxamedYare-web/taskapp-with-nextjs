"use client"
import { Avatar, Button, Card, CardBody, CardHeader, Form, Input, Select, SelectItem } from "@heroui/react"
import { Camera, Upload } from "lucide-react"
import React, { useState } from "react"
import { Uploader } from "rsuite"


export const AddCurrentsCom = ()=>{
const [errorSelectCat,setErorSelectCat] = useState<string>("")



    const handleSubmitForm = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const dataInput = Object.fromEntries(new FormData(e.currentTarget))
        console.log(dataInput)
  
        if(dataInput.category==""){
            e.currentTarget.focus()
            setErorSelectCat("Please select if this current fiat or Crypto")
         
        }else{
              setErorSelectCat("")
        }
      
    }

       console.log(errorSelectCat)

return(
    <>
    <main className="p-3">
       <Card>
        <CardHeader>
            <h1 className="font-bold">Add Current</h1>
        </CardHeader>
        <CardBody>
            <Form onSubmit={handleSubmitForm} className="grid grid-cols-2 gap-3">

                <Select name="category" 
                color={errorSelectCat ? "danger" : "default"}
                description={errorSelectCat ? <h1 className="text-danger">{errorSelectCat}</h1> : "" }
              
                aria-label="kind current"
                placeholder="Select fiat or cryoto">
                  <SelectItem key={"fiat"}>fiat</SelectItem>
                  <SelectItem key={"crypto"}>Crypto</SelectItem>
                </Select>
                <Input required errorMessage="Current name is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} name="current_name" label="Current Name" placeholder="like btc or usdt and etc..."/>
                <Input required errorMessage="Current key is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} name="key" label="Current Key" placeholder="like bitcoin or usdt and etc..."/>
                <Input required errorMessage="Symbol is required" name="symbol" label="Symbol" placeholder="like usdt or btc"/>
                <Input  required errorMessage="Code is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} name="code" label="Code" placeholder="like '$' or btc"/>
                  <Select aria-label="status select" name="active" placeholder="Select Status">
                  <SelectItem key={"true"}>Publish</SelectItem>
                  <SelectItem key={"false"}>Draft</SelectItem>
                </Select>
                <Input required errorMessage="Min is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} type="number" name="min" label="Min" placeholder="current min"/>
                <Input required errorMessage="Max is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} type="number" name="max" label="Max" placeholder="Current max"/>
                <Input name="rate" required errorMessage="Rate is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} type="number" label="Rate" endContent="%" placeholder="Current rate"/>
                <Input name="reverse" required errorMessage="Reverce is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} type="number" label="Reverse"  placeholder="Current reverse"/>
                <Input className="col-span-2" required errorMessage="Account number is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} type="number" name="account_number" label="Account"  placeholder="you account number or address"/>
        
                    <Uploader className="col-span-2 bg-default-200 rounded" action="">
                      <div className="flex items-center  font-bold text-default-500 h-[200px] justify-center gap-1">
                            <Upload/> 
                            <h1>Upload current image </h1>
                            </div>
                      
                    </Uploader>
                
                <Button type="submit" color="primary">Create Current</Button>
            </Form>

        </CardBody>
       </Card>

    </main>
    </>
)



}


