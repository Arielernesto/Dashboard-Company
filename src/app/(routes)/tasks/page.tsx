
import { prisma } from "@/lib/prisma"
import Calendar from "./components/Calendar/Calendar"
import { getServerSession } from "next-auth"
import { handler } from "@/app/api/auth/[...nextauth]/route"

export default async function TasksPage() {
    const session : any = await getServerSession(handler)

    const companies = await prisma.company.findMany({
        where: {
            userId: session?.user.email
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    const events = await prisma.event.findMany({
        orderBy: {
            createdAt: "desc"
        },
        where: {
            company: {
                userId: session?.user.email
            }
        },
        include: {
            company: true
        }
    }) 
    return (
    <section>
        <Calendar companies={companies} events={events}/>
    </section>
  )
}
