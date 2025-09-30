
import cookies from "js-cookie"
import axios from "axios"

const token =  cookies.get("userToken")
console.log(token)
const urlDom = "http://localhost:3000/api"
const Api = axios.create({
    baseURL:urlDom,
    headers:{Authorization:`Bearer ${token}`}
})

export default Api

