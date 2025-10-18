import { UpdateAvatorUser, uploadImageProfile } from "@/app/lib/userlib/user"
import { addToast, Avatar, Button, Card, CardBody, CardHeader, Form, Input, Spinner } from "@heroui/react"
import Cookies from "js-cookie"
import { Upload } from "lucide-react"
import React, { useEffect, useState, useTransition } from "react"


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

export const ProfileDash = ({userProfileInfgo,_loading,userAccount}:{userProfileInfgo:IuserDash,_loading:boolean,userAccount:any})=>{

    const [isPendingUpload,startTransitionUplod] = useTransition()
    const [isPendingAvator,startTransitionAvator] = useTransition()
    const [avatorLink,setAvatorLink] = useState<string | null>(null)


// handle change file
const handleChangeFile = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.item(0)
    startTransitionUplod(async()=>{
        const result = await uploadImageProfile(file)
        if(result?.response?.data?.error){
            addToast({
                title:"Error with upload",
                description:result?.response?.data?.error,
                color:"danger",
                timeout:4000,
                shouldShowTimeoutProgress:true
            })
            return
        }
      setAvatorLink(result.display_url)
    })
}

useEffect(()=>{
    if(!avatorLink){
        return 
    }

    if(avatorLink){
        const avatorAndId = {
            avator:avatorLink,
            id:String(userProfileInfgo?.id)
        }
        startTransitionAvator(async()=>{
            const result = await UpdateAvatorUser(avatorAndId)
            console.log(result)
            addToast({
                title:"Hampalyo😎",
                description:result.message,
                color:"success",
                timeout:3000,
                shouldShowTimeoutProgress:true
            })
            setAvatorLink(null)
            userAccount(Cookies.get("userToken") as string)
        })
    }


},[avatorLink,userProfileInfgo?.id,userAccount])

return (
    <>
    <main className="p-3 flex flex-col gap-3">
        {/* edit profile time */}
     <div className="rounded bg-default-50 p-2 flex justify-between items-center">
      <article>
        <h1 className="font-bold text-default-600">Profile</h1>
        <p className="font-semibold text-default-500">You can edit you profile and change image profile and eth</p>
      </article>

      {/* joined */}
      <article>
        <h1 className="font-bold text-default-600">You Joined</h1>
        <p className="font-semibold text-default-500">{new Date(userProfileInfgo?.createdAt).toLocaleString()}</p>
      </article>

     </div>

{/* card profile data */}
<div className="grid grid-cols-2 gap-3 w-full">

    {/* details user edit form*/}
    <Card className="w-full col-span-2">
    <CardHeader className="flex flex-col items-start border-b-1 border-primary-500">
      <h1  className="font-bold text-default-600">Edit</h1>
      <p className="font-semibold text-default-500">Edit you profile</p>
    </CardHeader>
    <CardBody>
        <Form className="grid grid-cols-2">
            <div className="flex flex-col gap-3 relative items-center bg-gradient-to-tl from-warning-500 to-secondary-500 shadow rounded pt-10 shadow-primary-500 justify-center col-span-2">
              {
            userProfileInfgo?.avator == "" ? <Avatar size="lg"/> : isPendingUpload ? 
            <Avatar size="md" color="warning"  icon={<Spinner variant="simple" color="primary"/>}/>:
             isPendingAvator ? <Avatar size="md" color="warning" 
              icon={<Spinner variant="simple" color="primary"/>}/> : 
              <Avatar isBordered size="lg" color="success" src={userProfileInfgo?.avator}/>
        }
        <Input onChange={handleChangeFile} id="file" className="hidden" type="file"/>
           
            <Button className="absolute -bottom-13" type="submit" as={"label"} htmlFor="file" startContent={<Upload/>} color="primary" variant="ghost">
            
            {
                userProfileInfgo?.avator == "" ? "Upload Image" : "Update Image"
            }
                </Button>
     
            </div>
           <div className="grid grid-cols-2 mt-13 w-full col-span-2 gap-3">
             <Input label="You Name" name="firstname" value={userProfileInfgo?.firstname} />
            <Input label="Last Name" name="lastname" value={userProfileInfgo?.lastname}/>
            <Input label="Username" name="username" value={userProfileInfgo?.username}/>
            <Input label="Email Address" name="email" value={userProfileInfgo?.email}/>
            <Input label="You WhatsApp" name="whatsapp" />
            <Input label="You Telegram" name="telegram" />
            <Button color="primary" variant="shadow" className="md:w-1/3">Update Profile</Button>
           </div>
        </Form>
    </CardBody>
</Card>
    {/* change you password*/}
    <Card className="w-full col-span-2">
    <CardHeader className="flex flex-col items-start border-b-1 border-primary-500">
      <h1 className="font-bold text-default-600">Change Password</h1>
      <p className="font-semibold text-default-500">to change you password you must know old or current password</p>
    </CardHeader>
    <CardBody>
        <Form className="grid grid-cols-2">
            <Input name="old_password" type="password" label="Current Password"/>
            <Input name="new_password" type="password" label="New Password"/>
            <Input name="con_password" className="col-span-2" type="password" label="Confirm Password"/>
            <Button color="primary"  variant="flat">Change Password</Button>
        </Form>
    </CardBody>
</Card>
</div>

    </main>
    
    </>
)

}



