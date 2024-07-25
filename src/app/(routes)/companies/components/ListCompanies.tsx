import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import TableCompanies from "./TableCompanies"
import { columns } from './columns'
export default async function ListCompanies() {
  const companies = await prisma.company.findMany({
    where: {

    },
    orderBy: {
        createdAt: 'desc'
    }
  })
  return (
    <TableCompanies columns={columns} data={companies}/>
  )
}
