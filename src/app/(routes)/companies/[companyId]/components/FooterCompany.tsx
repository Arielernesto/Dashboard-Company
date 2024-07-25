"use client"
import { useRouter } from "next/navigation"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export type FooterCompanyProps = {
    companyId: string
}

export default function FooterCompany(props: FooterCompanyProps) {
  const { companyId } = props
  const router = useRouter()

  const onDelete = async () => {
    try {
        const pet = await fetch('/api/companies/' + companyId, {
            method: "DELETE"
        })
        router.push("/companies")
        router.refresh()
        toast({title: "company deleted!"})
    } catch (error) {
        toast({title: "Error", variant: "destructive"})
    }
    
  }

  return (
    <div className="flex justify-end mt-5">
        <Button variant="destructive" onClick={onDelete}>
            <Trash className="w-4 h-4 mr-2"/>
            Remove Company
        </Button>
    </div>
  )
}
