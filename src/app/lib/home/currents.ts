import Api from "../apidata"

// all current with home
export const getAllCurrentWithHome = async()=>{
    try {
        const res = await Api.get("/home/currents")
        return await res.data
    } catch (error) {
        console.log(error)
    }
}


