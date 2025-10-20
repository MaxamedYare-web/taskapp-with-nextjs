"use client"
import { Avatar, Button, Card, CardBody, CardHeader, Form, Input, Select, SelectItem } from "@heroui/react"
import { Camera, Upload } from "lucide-react"


export const AddCurrentsCom = ()=>{


return(
    <>
    <main className="p-3">
       <Card>
        <CardHeader>
            <h1>Add Current</h1>
        </CardHeader>
        <CardBody>
            <Form className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Input id="file" type="file" className="hidden"/>
                    <div>
                        <Avatar size="lg" icon={<Camera/>}/>
                    </div>
                    <Button  as={"label"} htmlFor="file" startContent={<Upload/>} color="primary" variant="ghost">
                        Upload Current 
                    </Button>
                </div>
                <Select  name="category" placeholder="Select fit or cryoto">
                  <SelectItem key={"fiat"}>fiat</SelectItem>
                  <SelectItem key={"crypto"}>Crypto</SelectItem>
                </Select>
                <Input required errorMessage="Current name is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} name="current_name" label="Current Name" placeholder="like btc or usdt and etc..."/>
                <Input required errorMessage="Current key is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} name="key" label="Current Key" placeholder="like bitcoin or usdt and etc..."/>
                <Input required errorMessage="Symbol is required" name="symbol" label="Symbol" placeholder="like usdt or btc"/>
                <Input required errorMessage="Code is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} name="code" label="Code" placeholder="like '$' or btc"/>
                  <Select name="active" placeholder="Select Status">
                  <SelectItem key={"true"}>Publish</SelectItem>
                  <SelectItem key={"false"}>Draft</SelectItem>
                </Select>
                <Input required errorMessage="Min is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} type="number" name="min" label="Min" placeholder="current min"/>
                <Input required errorMessage="Max is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} type="number" name="max" label="Max" placeholder="Current max"/>
                <Input name="rate" required errorMessage="Rate is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} type="number" label="Rate" endContent="%" placeholder="Current rate"/>
                <Input name="reverse" required errorMessage="Reverce is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} type="number" label="Reverse"  placeholder="Current reverse"/>
                <Input required errorMessage="Account number is required" classNames={{label:"font-semibold text-default-500 text-[18px]"}} type="number" name="account_number" label="Account"  placeholder="you account number or address"/>
                <Button type="submit" color="primary">Create Current</Button>
            </Form>

        </CardBody>
       </Card>

    </main>
    </>
)



}


