"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useState } from "react"
import FormCreateCustomer from "./FormCreateCustomer"

export default function HeaderCustomers() {
  const [openModalCreate, setOpenModalCreate] = useState(false)

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">List of Customers</h2>
      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Create Customer</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
        <DialogTitle>Create Customer</DialogTitle>
          <DialogHeader>
            <DialogDescription>
              Create and configure your customer
            </DialogDescription>
          </DialogHeader>

          <FormCreateCustomer setOpenModalCreate={setOpenModalCreate}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
