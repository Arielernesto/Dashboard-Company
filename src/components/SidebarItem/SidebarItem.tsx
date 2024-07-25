"use client"
import Link from "next/link"
import { SidebarItemProps } from "./SidebarItem.types"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function SidebarItem(props: SidebarItemProps) {
  const {href, icon: Icon, label} = props.item

  const pathname = usePathname()
  const activePath = pathname == href

  return (
    <Link href={href}
    className={cn(`flex gap-x-2 mt-2 light:text-slate-700 p-2 dark:text-white text-sm items-center hover:bg-slate-300/20 rounded-lg cursor-pointer`, activePath && `bg-slate-400/20`)}>
        <Icon className="h-5 w-5" strokeWidth={1}></Icon>
        {label}
    </Link>
  )
}
