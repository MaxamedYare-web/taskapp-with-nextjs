import Api from "../apidata"


// update profile image
export const UpdateProfileImage = async(dataUp:any)=>{


try {
const res = await Api.put("/admin/profile",dataUp)
const data = await res.data
return data
    
} catch (error) {
    console.log(error)
    return error
}


}


// update dataform
export const UpdateFormDataAdmin = async(id:string,formdata:any)=>{
    try {
    const res = await Api.put(`/admin/userinfo/update/${id}`,formdata)
    const data = await res.data
    return data
        
    } catch (error) {
        return error
    }
}


// change password 
export const ChangePassword = async (id:string,passwordData:any) =>{
    const dataInputPass = {
        id,
       newPassword:passwordData.newPassword,
       oldPassword:passwordData.oldPassword

    }
 
    try {
        const res = await Api.put("/admin/password",dataInputPass)
        const data = await res.data
        return data
        
    } catch (error) {
        return error
    }
    

}



