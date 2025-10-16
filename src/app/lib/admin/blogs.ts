import Api from "../apidata"


// create blogs
export const AddBlogs = async(data:any)=>{

try {
    const response = await Api.post("/admin/blogs/add",data)
    const dataInfo = await response.data
    return dataInfo
} catch (error) {
    console.log(error)
    return error
}

}

// get all blogs
 export const getBlogs = async()=>{
    try {   
 const response = await Api.get("/admin/blogs")

 const data = await response.data
 return data
    } catch (error) {
        return error
    }
 }


//  update blogs
export const updateBlog = async(id:string,data:any)=>{

 try {

    const update = await Api.put(`/admin/blogs/update/${id}`,data)
    return update
    
 } catch (error) {
    return error
 }


}



