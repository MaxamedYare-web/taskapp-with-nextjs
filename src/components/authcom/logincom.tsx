"use client";
import { useLoginUser } from "@/app/lib/auth";
import {
    addToast,
    Button,
    Card,
    CardBody,
    CardHeader,
    Form,

    Input,

    Spinner
} from "@heroui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import imgHead from "../../../public/nevergivup.png";
import Link from "next/link";
import { redirect } from "next/navigation";
import Cookies from "js-cookie"


type Iurl = any


const LoginComponent = () => {
    const {LoginUser,isLoading,errors,userData} = useLoginUser()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget))
        LoginUser(data)
    }


useEffect(()=>{
    if(errors){
        const netEr = errors?.response?.data?.error
        addToast({
            title:"Sorry there is error",
            description:netEr ? netEr : errors,
            color:"danger",
            variant:"flat"
        })
    }
},[errors])

useEffect(()=>{
    if(userData){
      
        addToast({
            title:"😍 Conguration hambaloy",
            description:`Waad ku gulesati in gasho accounkada ${userData.message}`,
            timeout:2000,
            shouldShowTimeoutProgress:true,
            color:"success",
            variant:"flat"

        })

        if(userData.banned){
            redirect("/dashboard/ban")
        }
    
            if(userData.role !== "Admin"){
                 redirect("/dashboard") 
            }
            if(userData.role == "Admin"){
                redirect("/admin")
               
            }
            
    }
},[userData])


useEffect(()=>{
    const token = Cookies.get("userToken")
    if(token){
    redirect("/dashboard")
}
},[])


    return (
        <div className="h-screen flex justify-center p-2  items-center">
            <Card className="flex relative">
                <div className="flex">
                    <div className="flex-2">
                        <CardHeader className="flex flex-col items-start">
                            <h1 className="text-primary-500 font-bold text-2xl max-w-100">
                                Welcome Back user
                            </h1>
                            <p className="text-default-400 font-semibold">
                                login to go you account you can use Username or email and then password

                            </p>
                        </CardHeader>
                        <CardBody>
                            <Form
                                onSubmit={handleSubmit}
                                className="w-full space-y-1"
                            >


                                <Input
                                    type="text"
                                    labelPlacement="outside"
                                    classNames={{ label: "text-lg" }}
                                    label="Username or Email"
                                    isRequired
                                    errorMessage="Please eneter you username or email"
                                    name="username"
                                />

                                <Input
                                    type="password"
                                    name="password"
                                    labelPlacement="outside"
                                    classNames={{ label: "text-lg" }}
                                    label="Password"
                                    isRequired
                                    errorMessage="Please enter you password"
                                    
                                />
                                <Button color="primary" type="submit">{isLoading ? (<div className="flex gap-2 items-center"><Spinner color="white"
                                               /> logining... </div>):"Login"}</Button>
                            </Form>
                        </CardBody>
                    </div>
                    <div className="bg-primary-500 hidden sm:block h-[100%] w-[100px] flex-1/7 relative">
                        <div className="h-70 w-70 left-[10%] -z-1 animate-fade-out top-3 rounded-full bg-primary-600 absolute"></div>
                        <Image
                            className=""


                            src={imgHead}

                            alt="image header"
                        />
                        <div className="absolute

            bg-secondary-500/50
             backdrop-blur-[7px]
             w-full h-25 z-10 bottom-0">
                            <div className="flex flex-col justify-center gap-2 p-3 items-start h-[100%]">
                                <p className="font-semibold text-white">if you don't have acccount please click Register</p>
                                <Button as={Link} href="/auth/register" color="default" variant="ghost"
     className="font-bold text-secondary-50 hover:text-primary-500 p-4
                 ">Register</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default LoginComponent;
