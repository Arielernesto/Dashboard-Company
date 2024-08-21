import { prisma } from "@/lib/prisma"
import TableCustomers from "./TableCustomers"
import { columns } from './columns'
import { getServerSession } from "next-auth"
import { handler } from "@/app/api/auth/[...nextauth]/route"

export default async function ListCustomers() {
  const session : any = await getServerSession(handler)
  const companies = await prisma.customer.findMany({
    where: {
      userId: session.user.email
    },
    orderBy: {
        expire: 'desc'
    }
  })
  return (
    <TableCustomers columns={columns} data={companies}/>
  )
}
