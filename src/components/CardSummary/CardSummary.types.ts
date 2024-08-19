import { LucideIcon } from "lucide-react"

export type CardSummaryProps = {
    icon: LucideIcon
    total: string | Promise<number>
    average: number
    title: string
    tooltipText: string
}