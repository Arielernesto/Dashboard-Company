import { prisma } from './prisma'
const totalCompanies = async () => {
    const total = (await prisma.company.findMany()).length
    
    return total
}

import { BookOpenCheck, UsersRound, Waypoints } from 'lucide-react'
export const CardSummaryData = [
    {
        icon: UsersRound,
        total:  totalCompanies(),
        average: 15,
        title: "Companies created",
        tooltipText: "See all of the companies created"
    },
    {
        icon: Waypoints,
        total: "86.5%",
        average: 89,
        title: "Total Revenue",
        tooltipText: "See all of the Summary"
    },
    {
        icon: BookOpenCheck,
        total: "363,95€",
        average: 30,
        title: "Bounce Rate",
        tooltipText: "See all of the Bounce Rate"
    }
] 