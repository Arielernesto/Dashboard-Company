import { Building } from "lucide-react"
import { CustomIcon } from "./CustomIcon"
import CustomersTable from "./CustomersTable"

export default function LastCustomers() {
  return (
    <div className="p-5 rounded-lg shadow-sm bg-background">
        <div className=" flex items-center gap-x-2">
            <CustomIcon  Icon={Building}/>
            <p>Last Customers</p>
        </div>
        <div>
          <CustomersTable />
        </div>
    </div>
  )
}
