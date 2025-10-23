import Api from "../apidata"

// upload current image
export const uploadCurrentImage = async(fileData:any)=>{

    const formData = new FormData()
    formData.append("file",fileData)

try {

    const response = await Api.post("/admin/currents/upload",formData)
    const dataRes = await response.data
    return dataRes
    
} catch (error) {
    return error
}

}

// add currents
export const AddCurrent = async(dataCurrent:any)=>{
    try {
        const res = await Api.post("/admin/currents/add",dataCurrent)
        const dataRes = await res.data
        return dataRes
    } catch (error) {
        console.log(error)
        return error
    }
}

// get all currents 
export const getAllCurrents = async()=>{
    try {
        const response = await Api.get("/admin/currents")
        const dataRes = await response.data
        return dataRes
        
    } catch (error) {
        console.log(error)
        return error
    }
}





