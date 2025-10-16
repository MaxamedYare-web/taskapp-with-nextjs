
"use client"

import { addToast, Avatar, Button, Card, CardBody, CardFooter, CardHeader, Form, Input, Link, Skeleton, Spinner, User } from "@heroui/react"
import { Camera, Eye, EyeClosed } from "lucide-react"
import { useDataAdmin } from "./utils/contextProvider"
import React, { useEffect, useState, useTransition } from "react"
import useUploadImage from "@/app/lib/admin/upload"
import { ChangePassword, UpdateFormDataAdmin, UpdateProfileImage } from "@/app/lib/admin/updateProfile"
import { useRouter } from "next/navigation"

export default function SettingCom() {
    const { dataInfo, isloading, refetchingAdminData } = useDataAdmin()
    const [isPendingUpload, startTransitinUpload] = useTransition()
    const [avatorLink, setAvatorLink] = useState<string>("")
    const [isPenUpdate, startProfileUp] = useTransition()
    const [isPenFormInput, startformInput] = useTransition()
    const [cP, setCp] = useState<string | null>(null)
    const [oldPass, setOldPass] = useState<boolean>(false)
    const [isNewPass, setIsNewPass] = useState<boolean>(false)
    const [isVConPass, setVIsConPass] = useState<boolean>(false)
    const [isPenChangePass,startChangePass] = useTransition()


    const { UploadFile } = useUploadImage()




    // handle change file 
    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0)
        startTransitinUpload(async () => {
            const result = await UploadFile(file)
            setAvatorLink(result.display_url)
        })
    }



    // founded avator and then send database to you profile link
    useEffect(() => {


        if (!avatorLink) return;

        const dataProfile = {
            id: dataInfo?.adminData?.id,
            avator: avatorLink
        }
        startProfileUp(async () => {
            const result = await UpdateProfileImage(dataProfile)

            if (result.message) {
                await refetchingAdminData()
                setAvatorLink("")
                addToast({
                    title: "Conguration Profile was updated😎",
                    description: result.message,
                    color: "success",
                    timeout: 4000,
                    shouldShowTimeoutProgress: true
                })
            }

        })


    }, [avatorLink])

    // handle form input data
    const HandleSubmitFormUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const dataInput = Object.fromEntries(new FormData(e.currentTarget))
        startformInput(async () => {
            const result = await UpdateFormDataAdmin(dataInfo?.adminData?.id, dataInput)
            if (!result.success) {
                addToast({
                    title: "failed with update",
                    description: "Failed with updating please try again",
                    color: "danger",
                    timeout: 5000,
                    shouldShowTimeoutProgress: true,
                })
            }
            if (result.message) {
                addToast({
                    title: 'Updated Success😍',
                    description: result.message,
                    color: "success",
                    shouldShowTimeoutProgress: true,
                    timeout: 3000
                })
            }
        })

    }



    // handle change password
    const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget))

        if (data.newPassword !== data.cp) {
            setCp("New Password and Confirm Password must be equil")
          return

        } else {
            setCp(null)
        
        }

        startChangePass(async()=>{
            const result = await ChangePassword(dataInfo?.adminData?.id,data)
            console.log(result)
           if(result?.response?.data?.error){
            addToast({
                title:"failed😒",
                description:result.response.data.error,
                color:"danger",
                timeout:5000,
                shouldShowTimeoutProgress:true

            })
           }
           if(result?.message){
            addToast({
                title:"Conguration Password changed😍",
                description:result.message,
                color:"success",
                timeout:5000,
                shouldShowTimeoutProgress:true
            })
           }
        })

    }

    // loading
    if (isloading) {
        return (
            <>
                <main className="p-3">
                    <div className="space-y-2 md:flex gap-2 md:space-y-0">
                        <Skeleton classNames={{
                            base: "bg-primary-200"
                        }} className="w-full rounded">
                            <Card classNames={{
                                base: "rounded w-full"
                            }}>
                                <CardHeader className="flex items-start border-b-1 border-b-primary-500">
                                    <h1 className="font-semibold">Profile Setting</h1>
                                </CardHeader>
                                <CardBody>
                                    <Form className="flex flex-col items-center justify-center">
                                        <Input id="file" type="file" className="hidden" />
                                        <label htmlFor="file">
                                            <Avatar
                                                size="lg"
                                                icon={<Camera className="text-primary-500 w-15 h-15" />}
                                                classNames={{
                                                    base: "w-25 h-25",
                                                    icon: "w-30 h-30 text-5xl bg-primary-100"
                                                }}


                                            />
                                            <h1>Upload Photo</h1>
                                        </label>
                                        <Input defaultValue={dataInfo?.adminData?.firstname} placeholder="First Name" />
                                        <Input defaultValue={dataInfo?.adminData?.lastname} placeholder="Last Name" />
                                        <Input defaultValue={dataInfo?.adminData?.username} placeholder="Username" />
                                        <Input defaultValue={dataInfo?.adminData?.email} type="email" placeholder="Email Address" />
                                        <Button color="primary" className="w-full">Update Setting</Button>
                                    </Form>
                                </CardBody>

                            </Card>
                        </Skeleton>
                        {/* change password */}
                        <div className="w-full space-y-2">
                            <Skeleton classNames={{
                                base: "bg-primary-200"
                            }} className="rounded">
                                <Card className="" classNames={{
                                    base: "rounded w-full h-auto"
                                }}>
                                    <CardHeader className="border-b-1 border-b-primary-500">
                                        <h1 className="font-semibold">Change Password</h1>
                                    </CardHeader>
                                    <CardBody>
                                        <Form className="flex flex-col items-center justify-center">
                                            <Input type="password" placeholder="Old Password" />
                                            <Input type="password" placeholder="New Password" />
                                            <Input type="password" placeholder="Confrim Password" />
                                            <Button color="primary" className="w-full">Change Password</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Skeleton>
                            {/*  */}
                            <Skeleton classNames={{
                                base: "bg-primary-200"
                            }} className="rounded ">
                                <Card className="" classNames={{
                                    base: "rounded w-full h-auto"
                                }}>
                                    <CardHeader className="border-b-1 border-b-primary-500">
                                        <h1 className="font-semibold">Information</h1>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="font-semibold text-default-400 max-w-100">if you forget you old password try to solve or contact us you devloper</p>
                                    </CardBody>
                                    <CardFooter className="flex justify-between items-start ">
                                        <div>
                                            <h1 className="font-semibold ">Devloper Email</h1>
                                            <Link href="mailto:rumaan@gmail.com" className="font-semibold text-primary-300">rumaan@gmail.com</Link>
                                        </div>
                                        <div>
                                            <h1 className="font-semibold ">Devloper Phone</h1>
                                            <Link href="tel:+252616825183" className="font-semibold text-primary-300">+252616825183</Link>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Skeleton>



                        </div>
                    </div>
                </main>

            </>
        )
    }

    return (
        <>
            <main className="p-3">
                <div className="space-y-2 md:flex gap-2 md:space-y-0">
                    <Card classNames={{
                        base: "rounded w-full"
                    }}>
                        <CardHeader className="flex items-start border-b-1 border-b-primary-500">
                            <h1 className="font-semibold">Profile Setting</h1>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={HandleSubmitFormUpdate} className="flex flex-col items-center justify-center">
                                <Input onChange={handleChangeFile} id="file" type="file" className="hidden" />
                                <label htmlFor="file">
                                    <Avatar
                                        src={avatorLink ? avatorLink : dataInfo?.adminData?.avator && dataInfo?.adminData?.avator}
                                        fallback={isPendingUpload ? <Spinner color="primary" variant="simple" /> : <Camera className="text-primary-500 w-15 h-15" />}
                                        size="lg"
                                        classNames={{
                                            base: "w-25 h-25 bg-primary-100",
                                        }}
                                    />

                                    <div className="font-semibold text-default-500">
                                        {
                                            dataInfo?.adminData?.avator ? <div>
                                                {
                                                    isPenUpdate ? <div className="flex items-center gap-1">
                                                        <Spinner variant="simple" color="warning" /> <h1>Updating...</h1>
                                                    </div> : <h1>Update Profile</h1>
                                                }
                                            </div> : <h1>Upload Photo</h1>
                                        }

                                    </div>
                                </label>
                                <Input name="firstname" defaultValue={dataInfo?.adminData?.firstname} placeholder="First Name" />
                                <Input name="lastname" defaultValue={dataInfo?.adminData?.lastname} placeholder="Last Name" />
                                <Input name="username" defaultValue={dataInfo?.adminData?.username} placeholder="Username" />
                                <Input name="email" defaultValue={dataInfo?.adminData?.email} type="email" placeholder="Email Address" />
                                <Button type="submit" className={`w-full text-default-100 font-semibold ${isPenFormInput ? "bg-primary-200" : "bg-primary-500"}`}>
                                    {
                                        isPenFormInput ? <div className="flex items-center">
                                            <Spinner color="primary" variant="wave" /> <h1>Updating...</h1>
                                        </div> : "  Update Setting"
                                    }

                                </Button>
                            </Form>
                        </CardBody>

                    </Card>
                    {/* change password */}
                    <div className="w-full space-y-2">
                        <Card className="" classNames={{
                            base: "rounded w-full h-auto"
                        }}>
                            <CardHeader className="border-b-1 border-b-primary-500">
                                <h1 className="font-semibold">Change Password</h1>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleChangePassword} className="flex flex-col items-center justify-center">
                                    <Input 
                                    endContent={<Button onPress={() => setOldPass((prev) => !prev)} className="bg-inherit rounded-none shadow-none">
                                        {
                                            oldPass ? <EyeClosed /> : <Eye />
                                        }

                                    </Button>} required errorMessage="old password is required" name="oldPassword" type={oldPass ? "text" : "password"} placeholder="Old Password" />

                                    <Input 

                                     endContent={<Button onPress={() => setIsNewPass((prev) => !prev)} className="bg-inherit rounded-none shadow-none">
                                        {
                                            isNewPass ? <EyeClosed /> : <Eye />
                                        }

                                    </Button>}

                                      required errorMessage="new password is required" name="newPassword" type={isNewPass ? "text" : "password"} placeholder="New Password"/>

                                        <Input
                                        
                            endContent={<Button onPress={() => setVIsConPass((prev) => !prev)} className="bg-inherit rounded-none shadow-none">
                                        {
                                            isVConPass ? <EyeClosed /> : <Eye />
                                        }

                                    </Button>}
                                     color={cP ? "danger" : "default"}
                                     description={cP ? cP : ""}
                                     classNames={{
                                        description:"text-danger-500"
                                     }}
                                     name="cp" type={isVConPass ? "text" : "password"} placeholder="Confrim Password" />
                                        <Button type="submit"  
                                        className={`w-full text-default-100 
                                        ${isPenChangePass ? 
                                        "bg-primary-200":"bg-primary-500"}`}>
                                            {
                                                isPenChangePass ? <div className="flex items-center"><Spinner variant="simple"/>Change...</div>:"Change Password"
                                            }
                                            </Button>
                                    </Form>
            </CardBody>
                        </Card>
                        {/*information  */}
                        <Card className="" classNames={{
                            base: "rounded w-full h-auto"
                        }}>
                            <CardHeader className="border-b-1 border-b-primary-500">
                                <h1 className="font-semibold">Information</h1>
                            </CardHeader>
                            <CardBody>
                                <p className="font-semibold text-default-400 max-w-100">if you forget you old password try to solve or contact us you devloper</p>
                            </CardBody>
                            <CardFooter className="flex justify-between items-start ">
                                <div>
                                    <h1 className="font-semibold ">Devloper Email</h1>
                                    <Link href="mailto:rumaan@gmail.com" className="font-semibold text-primary-300">rumaan@gmail.com</Link>
                                </div>
                                <div>
                                    <h1 className="font-semibold ">Devloper Phone</h1>
                                    <Link href="tel:+252616825183" className="font-semibold text-primary-300">+252616825183</Link>
                                </div>
                            </CardFooter>
                        </Card>



                    </div>
                </div>
            </main>

        </>
    )
}



