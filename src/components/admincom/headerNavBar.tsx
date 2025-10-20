"use client"

import { Avatar, Skeleton, User } from "@heroui/react"

interface IadminInfo{
  email:string 
  firstname:string 
  lastname:string 
  username:string 
  avator:string 
  role:string 
  createdAt:string 
  lastlogin:string 

}

const HeaderNavBar = ({adminInfo,isPending}:{adminInfo:IadminInfo,isPending:boolean}) => {
console.log(isPending)

const avator = adminInfo?.avator as string
  return (
    <div className='flex justify-between items-center m-3 bg-white p-3 rounded'>
      <h1 className='text-lg md:text-2xl  font-bold text-gray-700'>Welcome Back, Admin</h1>

      {
        isPending ? <div className="max-w-[300px] w-full flex items-center gap-3">
          <div>
            <Skeleton  className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton  className="h-3 w-3/5 rounded-lg" />
            <Skeleton  className="h-3 w-4/5 rounded-lg" />
          </div>
        </div> :  <div className="flex items-center gap-2">
          <Avatar src={avator && avator}/>
          <article className="leading-4">
            <h1 className="font-semibold capitalize">{adminInfo?.firstname}</h1>
            <p className="font-semibold text-default-500">{adminInfo?.email}</p>
          </article>
        </div>
        
        }
       

    </div>
  )

}

export default HeaderNavBar


