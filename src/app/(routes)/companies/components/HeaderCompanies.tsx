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
import FormCreateCompany from "./FormCreateCompany"

export default function HeaderCompanies() {
  const [openModalCreate, setOpenModalCreate] = useState(false)

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">List of Companies</h2>
      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Create Company</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
        <DialogTitle>Create Company</DialogTitle>
          <DialogHeader>
            <DialogDescription>
              Create and configure your Company
            </DialogDescription>
          </DialogHeader>

          <FormCreateCompany setOpenModalCreate={setOpenModalCreate}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
