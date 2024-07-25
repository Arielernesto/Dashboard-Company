"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormContact from "./FormContact"


export default function NewContact() {
    const [Open, setOpen] = useState(false)
    const [mounted, SetMounted] = useState(false)

    useEffect(() => {
        SetMounted(true)
    }, []);
    return (
     <Dialog open={Open} onOpenChange={setOpen}>
        <DialogTrigger>
            {mounted &&
                <Button variant="default">Add new Contact</Button>
            }
        </DialogTrigger>

        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle>Add new contact</DialogTitle>
                <DialogDescription>
                    Create your contacts to manage them later.
                </DialogDescription>
            </DialogHeader>

            <FormContact  setOpen={setOpen} mounted={mounted}/>

        </DialogContent>
     </Dialog>
  )
}
