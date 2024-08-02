import {
    BarChart4,
    Building2,
    PanelsTopLeft,
    UsersRound,
    CircleHelpIcon,
    Calendar
} from 'lucide-react'

export const dataGeneralSidebar = [
    {
        icon: PanelsTopLeft,
        label: "Dashboard",
        href: '/'
    },
    {
        icon: Building2,
        label: "Companies",
        href: '/companies'
    },
    {
        icon: UsersRound,
        label: "Customers",
        href: '/customers'
    },
    {
        icon: Calendar,
        label: "Calendar",
        href: '/tasks'
    }
]

export const dataToolsSidebar = [
    {
        icon: CircleHelpIcon,
        label: "Faqs",
        href: '/faqs'
    },
    {
        icon: BarChart4,
        label: "Analytics",
        href: '/analytics'
    },
]

