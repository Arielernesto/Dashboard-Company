"use client"
import { dataGeneralSidebar, dataToolsSidebar} from "./SidebarRoutes.data"
import SidebarItem from "../SidebarItem/SidebarItem"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"


export default function SidebarRoutes() {
  return (
    <div className="flex flex-col justify-between h-full">
        <div>
            <div className="p-2 md:p-6">
                <p className="text-slate-500 mb-2">GENERAL</p>
                {dataGeneralSidebar.map((item) => (
                    <SidebarItem key={item.label} item={item}></SidebarItem>
                ))}
            </div>
       

        <Separator />
        
        <div className="p-2 md:p-6">
            <p className="text-slate-500 mb-2">TOOLS</p>
            {dataToolsSidebar.map((item) => (
                    <SidebarItem key={item.label} item={item}></SidebarItem>
                ))}
        </div>


       <div>
        <div className=" text-center p-6">
            <Button variant="outline" className=" w-full">
                Upgrade Plan
            </Button>
        </div>
        <Separator />

        <footer className="mt-3 p-3 text-center">
            2024. All rights reserved
        </footer>
       </div>
        </div>
    </div>
  )
}
