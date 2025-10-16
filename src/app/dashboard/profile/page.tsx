"use client"
import { useUserDash } from "@/app/lib/userlib/user";
import { ProfileDash } from "@/components/dashcom/profiledash";
import { useEffect } from "react";
import Cookies from "js-cookie";

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

const {errors,isLoading,userAccount,userData} = useUserDash()

const token = Cookies.get("userToken") as string
useEffect(()=>{
userAccount(token)
},[token])

const userInfo:IuserDash = userData?.account
    return <ProfileDash userAccount={userAccount} loading={Boolean(isLoading)}  userProfileInfgo={userInfo} />
}





