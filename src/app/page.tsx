"use client"
import Homepagecom from "@/components/home/homepagecom";
import NavBarHome from "@/components/home/navbarhom";
import Cookies from "js-cookie";
import { useEffect, useState, useTransition } from "react";
import { userDataOnline } from "./lib/userlib/user";

interface Iuser {
  id:number
  email:string
  avator:string
 firstname:string
 lastlogin:string 
 lastname:string 
 role:string 
 username:string
}


export default function Home() {

const token = Cookies.get("userToken") as string
const [_isPending,startTransition] = useTransition()
const [userInfo,setUserInfo] = useState<Iuser | null>(null)

useEffect(()=>{
 startTransition(async()=>{
  const result = await userDataOnline()
  setUserInfo(result.account)
 })
},[startTransition])

if(!userInfo){
  return
}

  return (<div  className="">
    <NavBarHome/>
  <Homepagecom userInfo={userInfo} token={token}/>
  </div>)
}
