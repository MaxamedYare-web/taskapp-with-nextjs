"use client"

import { getExchangeList, UpdateExchangeStatus } from "@/app/lib/admin/exchangelists"
import { addToast, Avatar, Button, Card, CardBody, CardHeader, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Skeleton, Snippet, Spinner, useDisclosure } from "@heroui/react"
import { formatDistance } from "date-fns"
import { AlarmClockCheck, ArrowDown, ArrowRight, CircleCheckBig, CircleX, Landmark, Wallet } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import { Steps } from "rsuite"

interface IExchange {
    from_current_name: string,
    to_current_name: string,
    from_current_img: string,
    to_current_img: string,
    from_current_amount: number,
    to_current_amount: number,
    account_number: string,
    user_account_number: string,
    from_amount_code: string,
    to_amount_code: string,
    payment_proof: string,
    authorId: number
    userId?: number
    status: IstatusEx
    id: string
    user_name: string
    user_username: string
    user_avator: string
    createdAt: string
    number_from_payment: string

}
type IstatusEx = "waiting" | "complated" | "rejected" | "refund"



export const ViewsSingleExchangeCom = ({ id }: { id: string }) => {

    const [isPending, startTransition] = useTransition()
    const [isPendingAprove, startTransitionAprove] = useTransition()
    const [isPendingRefund, startTransitionRefund] = useTransition()
    const [isPendingRejected, startTransitionRejected] = useTransition()
    const [singleData, setSingleData] = useState<IExchange | undefined>(undefined)
    const { isOpen, onOpenChange, onOpen } = useDisclosure()

    useEffect(() => {
        startTransition(async () => {
            const result = await getExchangeList()
            const p: IExchange[] = await result?.listExchnage
            const findExch = p?.find((p) => p.id == id)
            setSingleData(findExch)
        })
    }, [startTransition])

    console.log(singleData)

    const createdAtExchange = new Date(singleData?.createdAt ? singleData?.createdAt : new Date())
    const handleApproved = () => {
        startTransitionAprove(async () => {
            const result = await UpdateExchangeStatus("complated", id) as { updateStaus: IExchange, success: boolean }
            if (result?.updateStaus) {
                setSingleData(result?.updateStaus)
                onOpenChange()
                addToast({
                    title: "Successfully Complated",
                    description: "This order exchange was Complated",
                    shouldShowTimeoutProgress: true,
                    color: "success",
                    timeout: 4000,
                })


            }
        })
    }




    // handle refuns exchange
    const handleRefund = () => {
        startTransitionRefund(async () => {
            const result = await UpdateExchangeStatus("refund", id) as { updateStaus: IExchange, success: boolean }
            if (result?.updateStaus) {
                setSingleData(result.updateStaus)
            }
            if (result?.success) {
                onOpenChange()
                addToast({
                    timeout: 4000,
                    title: "Successfully Refund",
                    description: "This order exchange was Refunded",
                    shouldShowTimeoutProgress: true,
                    color: "warning"
                })
            }
        })
    }
    // handle rejected exchange
    const handleRejected = () => {

        startTransitionRejected(async () => {
            const result = await UpdateExchangeStatus("rejected", id) as { updateStaus: IExchange, success: boolean }
            if (result?.updateStaus) {
                setSingleData(result.updateStaus)
            }
            if (result?.success) {
                onOpenChange()
                addToast({
                    timeout: 4000,
                    title: "Successfully Rejected",
                    description: "This order exchange was Rejected",
                    shouldShowTimeoutProgress: true,
                    color: "danger"
                })
            }

        })
    }

    return (
        <>
            <main className="p-3">
                <div>

                    <Card>
                        <CardHeader className="flex justify-between">
                            <div className="flex gap-5 md:items-center flex-col md:flex-row">
                                <article className="flex items-center gap-2">
                                    <Skeleton isLoaded={!isPending} className="rounded-full">
                                        <Avatar isBordered src={singleData?.from_current_img} />
                                    </Skeleton>
                                    <div>
                                        <Skeleton className="rounded" isLoaded={!isPending}>
                                            <h1 className="font-bold">{singleData?.from_current_name}</h1>
                                        </Skeleton>
                                        <Skeleton className="rounded" isLoaded={!isPending}>
                                            <p className="font-semibold text-default-500">{`${singleData?.from_amount_code}${singleData?.from_current_amount}`}</p>
                                        </Skeleton>
                                    </div>
                                </article>
                                <ArrowRight className="text-default-500 hidden md:flex" />
                                <ArrowDown className="text-default-500  md:hidden" />
                                <article className="flex items-center  gap-2">
                                    <Skeleton className="rounded-full" isLoaded={!isPending}>
                                        <Avatar isBordered src={singleData?.to_current_img} />
                                    </Skeleton>
                                    <div>
                                        <Skeleton className="rounded" isLoaded={!isPending}>
                                            <h1 className="font-bold">{singleData?.to_current_name}</h1>
                                        </Skeleton>
                                        <Skeleton className="rounded" isLoaded={!isPending}>
                                            <p className="font-semibold text-default-500">{`${singleData?.to_amount_code}${singleData?.to_current_amount}`}</p>
                                        </Skeleton>
                                    </div>
                                </article>
                            </div>
                            <article className="space-y-2">
                                <Button color="primary" variant="flat">Status</Button>
                                {
                                    singleData?.status == "waiting" &&
                                    <Skeleton isLoaded={!isPending} className="rounded-full">
                                        <div className="flex items-center gap-1">

                                            <Spinner color="warning" variant="simple" />

                                            <p className="md:text-2xl text-warning-500">{singleData?.status}</p>


                                        </div>
                                    </Skeleton>


                                }
                                {
                                    singleData?.status == "complated" &&
                                    <Skeleton isLoaded={!isPending} className="rounded-full">
                                        <div className="flex items-center gap-1 bg-success-100  p-2 rounded-full">

                                            <CircleCheckBig className="text-success-500" />

                                            <p className="md:text-2xl text-success-500">{singleData?.status}</p>

                                        </div>
                                    </Skeleton>



                                }
                                {
                                    singleData?.status == "refund" && <Skeleton isLoaded={!isPending} className="rounded-full">
                                        <div className="flex items-center bg-warning-100 gap-1 p-2 rounded-full">

                                            <CircleCheckBig className="text-warning-500" />
                                            <p className="md:text-2xl text-warning-500">{singleData?.status}</p>
                                        </div>
                                    </Skeleton>


                                }
                                {
                                    singleData?.status == "rejected" && <Skeleton isLoaded={!isPending}>
                                        <div className={`flex items-center gap-1 bg-danger-100 p-2 rounded-full`}>

                                            <CircleX className="text-danger-500" />
                                            <p className="md:text-2xl text-danger-500 capitalize">{singleData?.status}</p>


                                        </div>
                                    </Skeleton>

                                }

                            </article>
                            <Skeleton isLoaded={!isPending} className="rounded">
                                <Button size="md" color="primary" variant="shadow" onPress={() => onOpen()}>Action</Button>
                            </Skeleton>
                        </CardHeader>
                        <CardBody>
                            <main className="flex justify-between">
                                <div>
                                    <Steps vertical >
                                        <Steps.Item icon={<AlarmClockCheck className="text-primary-500" />}
                                            title={"CreatedAt"} description={<Skeleton isLoaded={!isPending} className="rounded">{formatDistance(new Date(createdAtExchange), new Date(), { addSuffix: true })}</Skeleton>} />
                                        <Steps.Item title={"Amount Send"} icon={<Wallet className="text-primary-500" />}
                                            description={<Skeleton isLoaded={!isPending} className="rounded">
                                                <Snippet>{`${singleData?.to_current_amount}`}</Snippet>
                                            </Skeleton>} />

                                        <Steps.Item title={<Skeleton isLoaded={!isPending} className="rounded">
                                            {`User Account ${singleData?.to_current_name}`}
                                        </Skeleton>} icon={<Landmark className="text-primary-500" />}
                                            description={
                                                <Skeleton isLoaded={!isPending} className="rounded">
                                                    <Snippet classNames={{ symbol: "hidden" }}>{singleData?.user_account_number}</Snippet>
                                                </Skeleton>
                                            } />


                                    </Steps>
                                </div>
                                <div className="space-y-3 md:mr-5">
                                    <article className="space-y-1">
                                        <h1>Number from amount</h1>
                                        <Skeleton isLoaded={!isPending} className="rounded">
                                            <Snippet classNames={{ symbol: "hidden" }}>{singleData?.number_from_payment}</Snippet>
                                        </Skeleton>
                                    </article>
                                    <Skeleton isLoaded={!isPending} className="rounded">
                                        <Image height={250} width={200} src={singleData?.payment_proof} />
                                    </Skeleton>
                                </div>
                            </main>
                        </CardBody>
                    </Card>
                </div>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" classNames={{ backdrop: "bg-primary-500/50" }}>
                    <ModalContent>
                        <ModalHeader>
                            <h1>Exchange Status</h1>
                        </ModalHeader>
                        <ModalBody>
                            <p>this order you can reject if not recieve <strong>{singleData?.from_current_name}</strong> if you recieved click approved also you can refund</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button isLoading={isPendingAprove} onPress={handleApproved} color="primary">Approve</Button>
                            <Button isLoading={isPendingRefund} onPress={handleRefund} color="warning">Refund</Button>
                            <Button isLoading={isPendingRejected} onPress={handleRejected} color="danger">Reject</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </main>

        </>
    )
}






