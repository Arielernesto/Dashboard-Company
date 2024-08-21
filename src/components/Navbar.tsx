"use client"
import { Sheet, SheetContent,SheetTrigger } from "./ui/sheet"
import UserButton from "./UserButton"
import { Menu} from "lucide-react"
import SidebarRoutes from "./SidebarRoutes/SidebarRoutes"
import { ToggleTheme } from "./ToggleTheme"
export default function Navbar() {
  return (
    <nav className="flex items-center px-2  gap-x-4 md:px-6  w-full bg-background border-b h-20 xl:justify-end justify-between">
        <div className=" block  xl:hidden">
            <Sheet>
                <SheetTrigger className="flex items-center"> 
                   <Menu />
                </SheetTrigger>
                <SheetContent side="left">
                   <SidebarRoutes />
                </SheetContent>
            </Sheet>
        </div>

        <div className=" flex gap-x-2 items-center ">
            <ToggleTheme />
            <UserButton />
        </div>
    </nav>
  )
}
