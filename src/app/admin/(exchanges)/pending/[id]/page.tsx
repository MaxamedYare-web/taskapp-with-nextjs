import { ViewsSingleExchangeCom } from "@/components/admincom/exchanges/viewexchangecom";

interface Ipr {
    params:{id:string}
}

export default function ViewsSingleExchange({params}:Ipr){
const {id} =  params
    return <ViewsSingleExchangeCom id={id}/>
}

