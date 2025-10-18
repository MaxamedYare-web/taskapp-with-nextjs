"use client"
import Homepagecom from "@/components/home/homepagecom";
import NavBarHome from "@/components/home/navbarhom";
import Cookies from "js-cookie";
export default function Home() {

const token = Cookies.get("userToken") as string


  return (<div  className="">
    <NavBarHome/>
  <Homepagecom token={token}/>
  </div>)
}
