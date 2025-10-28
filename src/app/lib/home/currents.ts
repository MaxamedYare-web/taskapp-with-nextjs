import Api from "../apidata"

// all current with home
export const getAllCurrentWithHome = async()=>{
    try {
        const res = await Api.get("/home/currents")
        if(res.data.error){
            console.log(res.data.error)
        }
        return await res.data
    } catch (error) {
        console.log(error)
    }
}


