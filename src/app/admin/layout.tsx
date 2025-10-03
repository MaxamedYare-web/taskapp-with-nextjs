
import NavBarCom from '@/components/admincom/navbar'
import { DataProvideContext } from '@/components/admincom/utils/contextProvider'
import React from 'react'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <html lang='en'>
      <body
      cz-shortcut-listen="true"
       data-hasqtip="0"
      >
     <div className="flex">
        <NavBarCom/>
        <DataProvideContext>
             {children}
        </DataProvideContext>
       
     </div>
      </body>
    </html>
  )
}
