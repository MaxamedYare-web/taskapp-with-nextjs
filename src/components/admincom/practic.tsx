"use client"

import { Button, } from "@heroui/react";
import { useState } from "react";


export const PracticeWithTable = ()=>{
const [message,setMessage] = useState("")






 const handleDelete = async () => {
   
console.log(message)
    try {
      const response = await fetch("https://ibb.co/sv2rhtkg/a93b43b3ea852a41c13f9d5fa5eb1023", { method: "GET" });
      if (response.ok) {
        setMessage("✅ Image deleted successfully!");
      } else {
        const text = await response.text();
        setMessage(`❌ Failed to delete image: ${text}`);
      }
    } catch (err: any) {
      setMessage(`🚫 Error: ${err.message}`);
    }
  };

  

    return (
        <>
        <div className="w-full">
            <h1>Practice with table</h1>

 <div className="w-full bg-secondary-50 rounded p-3">
    


<Button onPress={handleDelete}>Test Delete</Button>

 </div>

        </div>
        </>
    )
}

