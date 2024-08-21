import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import TableCompanies from "./TableCompanies"
import { columns } from './columns'
import { handler } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export default async function ListCompanies() {
  const session : any = await getServerSession(handler)

  const companies = await prisma.company.findMany({
    where: {
      userId: session?.user.email
    },
    orderBy: {
        createdAt: 'desc'
    }
  })
  return (
    <TableCompanies columns={columns} data={companies}/>
  )
}
