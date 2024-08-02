"use client"
import { ColumnDef } from "@tanstack/react-table"

import { Customer } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { Pencil, MoveHorizontal } from "lucide-react"


export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "status",
        header: ({column}) => (
           
            <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost">
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start"> 

                    <DropdownMenuItem  onClick={() => column.setFilterValue("")}>
                        All
                    </DropdownMenuItem>

                    <DropdownMenuItem  onClick={() => column.setFilterValue("1")}>
                        Success
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => column.setFilterValue("0")}>
                        Procesing
                    </DropdownMenuItem>

                    <DropdownMenuItem  onClick={() => column.setFilterValue("100")}>
                        Failed
                    </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
            
        ),
        cell: ({row}) => {
            return (
            <div>
                { row.getValue("status") == "0" &&
                    "Procesing"
                }
                  { row.getValue("status") == "1" &&
                    "Success"
                }
                  { row.getValue("status") == "100" &&
                    "Failed"
                }
            </div>
            )
        }
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({row}) => (
            <div>
                €{row.getValue("amount")}
            </div>
        )
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({row}) => {
            const {id} = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" className="w-8 h-4 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoveHorizontal  className=" w-4 h-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/customers/${id}`}>
                            <DropdownMenuItem>
                                <Pencil  className="w-4 h-4 mr-2"/>
                                Edit
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]