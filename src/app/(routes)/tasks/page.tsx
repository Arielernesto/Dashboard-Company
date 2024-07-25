
import { prisma } from "@/lib/prisma"
import Calendar from "./components/Calendar/Calendar"


export default async function TasksPage() {
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
    <section>
        <Calendar companies={companies} events={events}/>
    </section>
  )
}
