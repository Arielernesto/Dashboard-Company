import { prisma } from "@/lib/prisma"
import CompaniesChart from "./components/CompaniesChart"

export default async function AnalyticsPage() {
    const companies = await prisma.company.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    const events = await prisma.event.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    
    return (
    <div className="bg-background shadow-md rounded-lg lg:p-4">
        <h2 className="mb-4 text-2xl">Analytics page</h2>
        <div>
            <CompaniesChart companies={companies} events={events}/>
        </div>
    </div>
  )
}
