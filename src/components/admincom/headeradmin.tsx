import { Card, CardHeader, Skeleton } from '@heroui/react'
import React from 'react'
import { Ban, CircleCheckBig, Landmark, User, UserPlus, Users } from "lucide-react";

const Headeradmin = ({isLoading}:any) => {
  return (<div className='w-full p-3'>
      <h1 className='text-2xl font-bold text-gray-700'>Welcome Back, Admin</h1>
    <div className='flex w-full justify-around gap-2'>
      
       <Skeleton isLoaded={isLoading} className='w-full rounded-lg'>
   <Card className='w-full'>
    <CardHeader className='flex flex-col'>
       <div className='flex items-center gap-1'>
        <UserPlus className='font-bold text-gray-500'/>
         <h1 className='font-bold text-gray-500'>Today Joined</h1>
       </div>
        <p className='font-bold'>3</p>
    </CardHeader>
  </Card>
 </Skeleton>
 <Skeleton isLoaded={isLoading} className='w-full rounded-lg'>
   <Card className='flex flex-col w-full'>

     <CardHeader className='flex flex-col'>
       <div className='flex items-center gap-1'>
        <Users className='font-bold text-gray-500'/>
          <h1 className='font-bold text-gray-500'>Total Users 
       </h1>
       </div>
      
       <p className='font-bold'>20</p>
        
    </CardHeader>

  </Card>
 </Skeleton>
 <Skeleton isLoaded={isLoading} className='w-full rounded-lg'>
   <Card className="w-full">
    <CardHeader className='flex flex-col'>
       <div className='flex items-center gap-1'>
        <CircleCheckBig className='font-bold text-gray-500'/>
          <h1 className='font-bold text-gray-500'>Total Tasks</h1>
       </div>
       
        <p className='font-bold'>15</p>
    </CardHeader>
  </Card>
 </Skeleton>
 <Skeleton isLoaded={isLoading} className='w-full rounded-lg'>
   <Card className='w-full'>
    <CardHeader className='flex flex-col'>
       <div className='flex items-center gap-1'>
        <Ban className='font-bold text-gray-500'/>
         <h1 className='font-bold text-gray-500'>Total Banned User</h1>
       </div>
        
        <p className='font-bold'>0</p>
    </CardHeader>
  </Card>
 </Skeleton>
 

    </div>
    </div>
  )
}

export default Headeradmin
