"use client"
import Api from "@/app/lib/apidata";
import React, { createContext, useContext, useEffect, useState } from "react";

interface dataContextType {
 dataInfo: any;
  isloading: boolean;
  errorInfo: any;
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

  useEffect(() => {
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
    fetchData()
  }, []);


  const value:dataContextType ={
   dataInfo,
   errorInfo,
   isloading
  }

  return <dataContext.Provider value={value}>
         {children}
  </dataContext.Provider>

};
