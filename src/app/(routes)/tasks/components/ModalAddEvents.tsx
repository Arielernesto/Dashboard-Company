import { Company } from "@prisma/client"
import { Dispatch, SetStateAction } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormEvents from "./FormEvents"

export type ModalAddEventsProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>,
    companies: Company[]
    setNewEvent: Dispatch<SetStateAction<{
        eventName: string,
        companieSelected: {name: string, id: string}
    }>>
}

export default function ModalAddEvents(props: ModalAddEventsProps) {
  const { open, companies, setNewEvent, setOnSaveNewEvent, setOpen} = props
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] ">
            <DialogHeader>
                <DialogTitle>Event</DialogTitle>
                <DialogDescription>Add a new event </DialogDescription>
            </DialogHeader>
           <FormEvents setOnSaveNewEvent={setOnSaveNewEvent} companies={companies} setNewEvent={setNewEvent} setOpen={setOpen}/>
        </DialogContent>
    </Dialog>
    )
}
