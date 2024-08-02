"use client"
import { useRouter } from "next/navigation"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export type FooterCompanyProps = {
    id: string
}

export default function CustomerFooter(props: FooterCompanyProps) {
  const { id } = props
  const router = useRouter()

  const onDelete = async () => {
    try {
        const pet = await fetch('/api/customers/' + id, {
            method: "DELETE"
        })
        router.push("/customers")
        router.refresh()
        toast({title: "Customer deleted!"})
    } catch (error) {
        toast({title: "Error", variant: "destructive"})
    }
    
  }

  return (
    <div className="flex justify-end mt-5">
        <Button variant="destructive" onClick={onDelete}>
            <Trash className="w-4 h-4 mr-2"/>
            Remove Customer
        </Button>
    </div>
  )
}
