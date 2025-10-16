"use client"
import Api from "@/app/lib/apidata";
import React, { createContext, useContext, useEffect, useState } from "react";

interface dataContextType {
 dataInfo: any
  isloading: boolean
  errorInfo: any
   fetchBlogs:()=>void

   refetchingAdminData : ()=>Promise<void>
}

const dataContext = createContext<dataContextType | undefined>(undefined);

export const useDataAdmin = () => {
  const context = useContext(dataContext);
  if (context == undefined) {
    throw new Error("use data must have data");
  }

  return context
};

export const DataProvideContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dataInfo, setDataInfo] = useState<any | null>(null);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<any | null>(null);

   const fetchData = async () => {
      setIsloading(true);
      try {
        const response = await Api.get("/admin");
        const data = await response.data;
        setDataInfo(data);
      } catch (error) {
        setErrorInfo(error);
      }finally{
        setIsloading(false)
      }
    };

  useEffect(() => {
    fetchData()
  }, []);


        const fetchBlogs = async()=>{
          try {
            const response = await Api.get("/admin/blogs")
          const dataBlogs = await response.data
          return dataBlogs
          } catch (error) {
            console.log("error with get blogs context",error)
            return {error}
          }
        }
      

  const value:dataContextType ={
   dataInfo,
   errorInfo,
   isloading,
   fetchBlogs,
   refetchingAdminData:fetchData,

  }

  return <dataContext.Provider value={value}>
         {children}
  </dataContext.Provider>

};
