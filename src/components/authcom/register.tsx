"use client";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Image,
  Input,
  Link,
  Skeleton,
  Spinner,
  toast,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import imgHead from "../../../public/nevergivup.png";
import NextImage from "next/image";
import Api from "@/app/lib/apidata";
import Cookies from "js-cookie"


type Iurl = any


const RegisterCom = () => {
  const [password,setPassword] = useState<string>("")
  const [cPassword,setCPassword] = useState<string>("")
  const [token,setToken] = useState<string | null>(null)
 const [isLoading,setIsLoading] = useState<boolean>(false)
 const [data,setData] = useState(null)
 const [errors,setErrors] = useState(null)
 

const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.currentTarget))
  setIsLoading(true)
 try {
  const response = await Api.post("/auth/register",data)
 const dataUser = await response.data
 if(dataUser.token){
  console.log(dataUser.token)
  const cookData = Cookies.set("userToken",dataUser.token,{
    expires:7
  })
  console.log(cookData)
   addToast({
    color:"success",
    timeout:3000,
    title:"Conguration 🤗",
    description:"Successfully you account was created",
    variant:"flat",
    shouldShowTimeoutProgress:true,
  })
 }
 if(dataUser.error){
  console.log(dataUser.error)
  setErrors(dataUser.error)
   addToast({
    color:"danger",
    timeout:5000,
    title:"There is Error",
    description:dataUser.error,
    variant:"flat",
    shouldShowTimeoutProgress:true,
    classNames:{
     closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
    }
    
  })
  return
 }

 if(dataUser.code == 'P5010'){
  console.log("Network failed please check you internet")
  addToast({
    color:"danger",
    timeout:5000,
    title:"Network disconnect",
    description:"Network failed please check you internet",
    variant:"flat",
    shouldShowTimeoutProgress:true,
    classNames:{
     closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
    }
    
  })
  return
 }

 console.log("get data is:",dataUser)
 } catch (error) {
   console.log("errors is:",error)
 }finally{
  setIsLoading(false)
 }

}


console.log("errors waa:",errors)

  return (
    <div className="h-screen flex justify-center p-2  items-center">
      <Card className="flex relative">
        <div className="flex">
          <div className="flex-2">
            <CardHeader className="flex flex-col items-start">
              <h1 className="text-primary-500 font-bold text-2xl max-w-100">
                Welcome New user we are happ to join us
              </h1>
              <p className="text-default-400 font-semibold">
                Please fill all input to register if you already have account
                click login and use u email or username and password
              </p>
            </CardHeader>
            <CardBody>
              <Form 
              onSubmit={handleSubmit}
              className="w-full space-y-1" 
              >
                <Input
                  type="text"
                  className="text-gray-500"
                  classNames={{ label: "text-lg" }}
                  labelPlacement="outside"
                  label="First name"
                  name="firstname"
                  isRequired
                  errorMessage="Please enter you name"
                />
                <Input
                  color="default"
                  classNames={{ label: "text-lg " }}
                  variant="faded"
                  type="text"
                  labelPlacement="outside"
                  label="Last name"
                  isRequired
                  errorMessage="Please eneter you last name"
                  name="lastname"
                />
                <Input
                  type="text"
                  labelPlacement="outside"
                  classNames={{ label: "text-lg" }}
                  label="Username"
                  isRequired
                  errorMessage="Please eneter you username"
                  name="username"
                />
                <Input
                  type="email"
                 
                  labelPlacement="outside"
                  classNames={{ label: "text-lg" }}
                  label="Email Address"
                   isRequired
                   errorMessage="Please enter you email address"
                   name="email"
                />
                <Input
                  type="password"
                  name="password"
                  labelPlacement="outside"
                  classNames={{ label: "text-lg" }}
                  label="Password"
                  isRequired
                  errorMessage="Please enter you password"
                  value={password}
                  onValueChange={setPassword}
                />
                <Input
                  type="password"

                  labelPlacement="outside"
                  classNames={{ label: "text-lg" }}
                  label="Confirm Password"
                 isInvalid={password !== cPassword ? true : false}
                  value={cPassword}
                  onValueChange={setCPassword}
                  errorMessage={password !== cPassword && "Password and Confirm Password must same"}
                  name="cpassword"
                />
                <Button color="primary" type="submit">{isLoading ? (<p className="flex gap-2 items-center"><Spinner color="white"
                /> Creating... </p>):"Create Account"}</Button>
              </Form>
            </CardBody>
          </div>
          <div className="bg-primary-500 hidden sm:block h-[100%] w-[100px] flex-1/7 relative">
          <div className="h-70 w-70 left-[10%] animate-fade-out top-3 rounded-full bg-primary-600 absolute"></div>
            <Image
            className=""
             
              width={350}
              height={660}
                 src={imgHead.src}
               as={NextImage}
              alt="image header"
            />
            <div className="absolute
            
            bg-secondary-500/50
             backdrop-blur-[7px]
             w-full h-25 z-10 bottom-0">
              <div className="flex flex-col justify-center gap-2 p-3 items-start h-[100%]">
                <p className="font-semibold text-white">Already have you registered click</p>
                <Button as={Link} href="/auth/login" color="default" variant="ghost"
                 className="font-bold text-secondary-50 hover:text-primary-500 
                 ">Login</Button>
              </div>
             </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegisterCom;
