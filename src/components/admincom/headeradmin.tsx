import { Card, CardHeader } from '@heroui/react'
import React from 'react'

const Headeradmin = () => {
  return (<div className='w-full p-3'>
      <h1 className='text-2xl font-bold text-gray-700'>Welcome Admin</h1>
    <div className='flex w-full justify-around gap-2'>
      
  <Card className='flex flex-col w-full'>
    <CardHeader className='flex flex-col'>
        <h1>Total Users</h1>
        <p>20</p>
    </CardHeader>
  </Card>
  <Card className="w-full">
    <CardHeader className='flex flex-col'>
        <h1>Total Tasks</h1>
        <p>15</p>
    </CardHeader>
  </Card>
  <Card className='w-full'>
    <CardHeader className='flex flex-col'>
        <h1>Total Banned User</h1>
        <p>0</p>
    </CardHeader>
  </Card>

    </div>
    </div>
  )
}

export default Headeradmin
