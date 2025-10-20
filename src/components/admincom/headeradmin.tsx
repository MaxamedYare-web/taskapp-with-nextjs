import { Card, CardHeader, Skeleton } from '@heroui/react';
import { Ban, CircleCheckBig, ClipboardClock, UserPlus, Users } from "lucide-react";

interface IpropHeader {
  users: {
    avator: string
    banned: boolean
    createdAt: string
    email: string
    lastlogin: string
    firstname: string
    lastname: string
    role: string
    username: string

  }
}

interface ICurrents{
  account_number:string 
  active:boolean 
  authorId:number 
  category:string 
  code:string 
  createdAt:string 
  current_name:string 
  id:number 
  img:string 
  key:string 
  max:number 
  min:number 
  rate:number
  reverse:string 
  symbol:string 
  updatedAt:string

}

const Headeradmin = ({users,isPending,currents}:{users:IpropHeader[],isPending:boolean,currents:ICurrents[]}) => {




let isKeltonPen = isPending == false ? true : false

  return (<div className='w-full p-3'>



    <div className='grid grid-cols-2 lg:flex w-full  justify-around gap-2 mt-3'>

      <Skeleton isLoaded={isKeltonPen} className='w-full  rounded-lg'>
        <Card className='w-full'>
          <CardHeader className='flex flex-col'>
            <div className='flex items-center gap-1'>
              <UserPlus className='font-bold text-gray-500' />
              <h1 className='font-bold text-gray-500'>Today Joined</h1>
            </div>
            <p className='font-bold'>3</p>
          </CardHeader>
        </Card>
      </Skeleton>
      <Skeleton isLoaded={isKeltonPen} className='w-full rounded-lg'>
        <Card className='flex flex-col w-full'>

          <CardHeader className='flex flex-col'>
            <div className='flex items-center gap-1'>
              <Users className='font-bold text-gray-500' />
              <h1 className='font-bold text-gray-500'>Total Users
              </h1>
            </div>

            <p className='font-bold'>{users?.length
            }</p>

          </CardHeader>

        </Card>
      </Skeleton>
      <Skeleton isLoaded={isKeltonPen} className='w-full rounded-lg'>
        <Card className="w-full">
          <CardHeader className='flex flex-col'>
            <div className='flex items-center gap-1'>
              <CircleCheckBig className='font-bold text-gray-500' />
              <h1 className='font-bold text-gray-500'>Total Exchange</h1>
            </div>

            <p className='font-bold'>{currents?.length}</p>
          </CardHeader>
        </Card>
      </Skeleton>
      <Skeleton isLoaded={isKeltonPen}  className='w-full rounded-lg'>
        <Card className='w-full'>
          <CardHeader className='flex flex-col'>
            <div className='flex items-center gap-1'>
              <Ban className='font-bold text-gray-500' />
              <h1 className='font-bold text-gray-500'>Total Banned</h1>
            </div>

            <p className='font-bold'>0</p>
          </CardHeader>
        </Card>
      </Skeleton>
      <Skeleton isLoaded={isKeltonPen} className='w-full rounded-lg'>
        <Card className='w-full'>
          <CardHeader className='flex flex-col'>
            <div className='flex items-center gap-1'>
              <ClipboardClock className='font-bold text-gray-500' />
              <h1 className='font-bold text-gray-500'>Pending</h1>
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
