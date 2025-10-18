"use client"
import { useUserDash } from "@/app/lib/userlib/user";
import { ProfileDash } from "@/components/dashcom/profiledash";
import Cookies from "js-cookie";
import { useEffect } from "react";

interface IuserDash {
  avator:string,
 createdAt:string,
  email:string,
  firstname:string,
  lastlogin:string,
  lastname:string,
  role:string,
  username:string,
  id:string
}


export default function ProfilePage (){

const {isLoading,userAccount,userData} = useUserDash()

const token = Cookies.get("userToken") as string
useEffect(()=>{
userAccount(token)
},[token,userAccount])

const userInfo:IuserDash = userData?.account
    return <ProfileDash userAccount={userAccount} _loading={Boolean(isLoading)}  userProfileInfgo={userInfo} />
}





