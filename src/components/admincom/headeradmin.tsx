import { Card, CardHeader, User as Profile, Skeleton } from '@heroui/react';
import { Ban, CircleCheckBig, UserPlus, Users } from "lucide-react";

interface IpropHeader{
  isLoading:any,
  dataInfo:any
}

const Headeradmin = ({isLoading,dataInfo}:IpropHeader) => {




  return (<div className='w-full p-3'>
      
    
    <div className='flex w-full justify-around gap-2 mt-3'>
      
       <Skeleton  isLoaded={isLoading} className='w-full rounded-lg'>
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
      
       <p className='font-bold'>{dataInfo?.users?.length
}</p>
        
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
       
        <p className='font-bold'>{dataInfo?.tasksData?.length}</p>
    </CardHeader>
  </Card>
 </Skeleton>
 <Skeleton isLoaded={isLoading} className='w-full rounded-lg'>
   <Card className='w-full'>
    <CardHeader className='flex flex-col'>
       <div className='flex items-center gap-1'>
        <Ban className='font-bold text-gray-500'/>
         <h1 className='font-bold text-gray-500'>Total Banned</h1>
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
