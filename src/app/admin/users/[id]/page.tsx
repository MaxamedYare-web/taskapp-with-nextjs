
import UserDetails from "@/components/admincom/userDetails"

interface Iprop{
   params:{id:string}
}
export default async function page ({params}:Iprop){
    const {id} = await params
    return <UserDetails id={id}/>
}

