import Api from "../apidata"


// get all exchange list
export const getExchangeList = async()=>{
    try {
    const res = await Api.get("/admin/exchange")
    return await res.data
    } catch (error) {
        console.log(error)
        return error
    }
}


// update status exchange 
export const UpdateExchangeStatus = async(dataStatus:string,id:string)=>{
    
    const status = {
        statusEx:dataStatus
    }
    try {
        const res = await Api.put(`/admin/exchange/update/${id}`,status)
        const dataRes = await res.data
       return dataRes
        
    } catch (error) {
        return error
    }
}



