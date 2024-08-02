import { prisma } from "@/lib/prisma"
import TableCustomers from "./TableCustomers"
import { columns } from './columns'

export default async function ListCustomers() {
  const companies = await prisma.customer.findMany({
    where: {

    },
    orderBy: {
        expire: 'desc'
    }
  })
  return (
    <TableCustomers columns={columns} data={companies}/>
  )
}
