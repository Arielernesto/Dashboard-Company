import SidebarRoutes from "../SidebarRoutes/SidebarRoutes"
import Logo from "../logo"

export default function Sidebar() {
  return (
    <aside className="h-screen">
        <div className=" h-full flex flex-col border-r">
            <Logo />
            <SidebarRoutes />
        </div>
    </aside>
  )
}
