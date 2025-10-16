"use client"
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import "./globals.css";
import 'rsuite/dist/rsuite-no-reset.min.css';
import {CustomProvider} from "rsuite"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
           cz-shortcut-listen="true"
    suppressHydrationWarning
      >
        <HeroUIProvider className="bg-gradient-to-tl from-primary-100 to-secondary-100">
          <ToastProvider 
          placement="top-center"
           toastProps={{
            
    hideIcon: true,
    classNames: {
      closeButton: "opacity-100 absolute top-4 top-1/2 -translate-y-1/2",
    },
    
  }} 
          />
          <CustomProvider>
             {children}
          </CustomProvider>
        </HeroUIProvider>
       
      </body>
    </html>
  );
}
