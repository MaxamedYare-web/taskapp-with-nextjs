import ViewPageCom from "@/components/admincom/currents/viewPageCom"
interface Iprams {
    params: { id: string }
}
export default async function ViewPage({ params }: Iprams) {
    const { id } = await params
    return <ViewPageCom id={id} />

}


