"use client"

import { getExchangeList } from "@/app/lib/admin/exchangelists"
import { Button, Input, Pagination, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@heroui/react"
import { formatDistance } from "date-fns"
import { ArrowRight, Eye } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import { Badge } from "rsuite"

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

}

type IstatusEx = "waiting" | "complated" | "rejected" | "refund"

export default function ApprovedCom() {
    const [isPending, startTransition] = useTransition()
    const [exchangeApproved, setExchangeApprove] = useState<IExchange[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    useEffect(() => {
        startTransition(async () => {
            const result = await getExchangeList()
            if (result.listExchnage) {
                const pendingArr: IExchange[] = result.listExchnage
                const filterPen = pendingArr.filter((p) => p.status == "complated")
                setExchangeApprove(filterPen)
            }
        })
    }, [startTransition])



    const columnData = [
        {
            key: "user",
            label: "user Info"
        },
        {
            key: "exchange",
            label: "Exchange"
        },
        {
            key: "created",
            label: "createdAt"
        },
        {
            key: "status",
            label: "status"
        },
        {
            key: "action",
            label: "action"
        },
    ]

    type exchangeApprove = (typeof exchangeApproved)[0]


    const exchangeListner = useCallback((pendingLists: exchangeApprove, columKey: React.Key) => {

        switch (columKey) {
            case "user":
                return (

                    <User
                        as={Link}
                        href={`/admin/users/${pendingLists.authorId}`}
                        name={pendingLists.user_name}
                        description={<h1>@{pendingLists.user_username}</h1>}
                        avatarProps={{ src: pendingLists.user_avator !== "" ? pendingLists.user_avator : undefined }}
                    />

                )
            case "exchange":
                return (
                    <div className="flex items-center justify-center gap-10">
                        <article>
                            <h1 className="font-bold text-default-500">{pendingLists.from_current_name}</h1>
                            <p className="text-default-400 font-semibold">{pendingLists.from_amount_code}{pendingLists.from_current_amount}</p>
                        </article>
                        <ArrowRight className="text-default-500" />
                        <article>
                            <h1 className="font-bold text-default-500">{pendingLists.to_current_name}</h1>
                            <p className="text-default-400 font-semibold">{pendingLists.to_amount_code}{pendingLists.to_current_amount}</p>
                        </article>

                    </div>
                )
            case "created":
                return (
                    <h1>{formatDistance(new Date(pendingLists.createdAt), new Date(), { addSuffix: true })}</h1>
                )
            case "status":
                return <h1 className="text-success-500 capitalize flex items-center bg-success-100 p-1 rounded gap-1 w-25 justify-center font-bold"><Badge color="green" /> {pendingLists.status}</h1>
            case "action":
                return <Button as={Link} href={`/admin/approved/${pendingLists.id}`} variant="ghost"><Eye />Veiw</Button>
        }

    }, [exchangeApproved])


    const pagePerRows = 7
    const pages = Math.ceil(exchangeApproved?.length / pagePerRows)

    const approveItems = useMemo(() => {
        const start = (currentPage - 1) * pagePerRows
        const end = start + pagePerRows
        return exchangeApproved?.slice(start, end)
    }, [exchangeApproved, currentPage])

    console.log(approveItems)




    return (
        <>
            <main className="p-3 space-y-3">
                <div className="flex justify-between p-2 rounded bg-default-50">
                    <article className="w-full">
                        <h1 className="font-semibold text-default-600">Exchange</h1>
                        <p className="text-default-500">Approved Exchange lists</p>
                    </article>
                    <Input placeholder="Searching exchange" />
                </div>

                {/* table */}
                <Table aria-label="pending lists"
                    bottomContent={
                        pages > 0 && <div className="flex justify-center items-center">
                            <Pagination isCompact showShadow page={currentPage} total={pages} onChange={(page) => setCurrentPage(page)} />
                        </div>
                    }
                >
                    <TableHeader columns={columnData}>
                        {
                            (col) => (<TableColumn align={col.key == "exchange" || "action" ? "center" : "start"} className="capitalize" key={col.key}>{col.label}</TableColumn>)
                        }
                    </TableHeader>
                    {
                        approveItems.length == 0 ? <TableBody isLoading={isPending} emptyContent={"there is no found pending"}>
                            {[]}
                        </TableBody> :
                            <TableBody isLoading={isPending} items={approveItems}>
                                {
                                    (exchangeItem) => (
                                        <TableRow key={exchangeItem.id}>

                                            {
                                                (col) => <TableCell>{exchangeListner(exchangeItem, col)}</TableCell>
                                            }

                                        </TableRow>
                                    )
                                }
                            </TableBody>
                    }


                </Table>

            </main>

        </>
    )
}




