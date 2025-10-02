import { Link, Listbox, ListboxItem } from "@heroui/react";
import React from "react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
   <>
   <div className="w-md bg-secondary-50 h-screen">
   
   <main className="mt-5">
    <div>
    <h1 className="text-2xl font-bold ml-2">Admin Dashboard </h1>
    <hr />
   </div>

{/* show dashboard */}
 <Listbox>
    <ListboxItem>
        Dashboard
    </ListboxItem>
    <ListboxItem>
        Users
    </ListboxItem>
 </Listbox>


   </main>


   </div>
   
   </>

  );
}

