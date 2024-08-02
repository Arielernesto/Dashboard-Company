import { Building } from "lucide-react"
import { CustomIcon } from "./CustomIcon"
import CustomersTable from "./CustomersTable"
import { prisma } from "@/lib/prisma"

export default async function LastCustomers() {
  const customers = await prisma.customer.findMany({take: 5})
  return (
    <div className="p-5 rounded-lg shadow-sm bg-background">
        <div className=" flex items-center gap-x-2">
            <CustomIcon  Icon={Building}/>
            <p>Last Customers</p>
        </div>
        <div>
          <CustomersTable customers={customers}/>
        </div>
    </div>
  )
}
