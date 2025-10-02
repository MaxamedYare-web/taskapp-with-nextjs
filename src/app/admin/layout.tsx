import NavBarCom from '@/components/admincom/navbar'
import React from 'react'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <html>
      <body>
     <div className="flex">
        <NavBarCom/>
        {children}
     </div>
      </body>
    </html>
  )
}
