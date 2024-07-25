"use client"
import { Company } from "@prisma/client"
import { Dispatch, SetStateAction } from "react"
import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Input } from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { Button } from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'


export type FormEventsProps = {
    setNewEvent: Dispatch<SetStateAction<{
        eventName: string,
        companieSelected: {name: string, id: string}
    }>>,
    setOpen: Dispatch<SetStateAction<boolean>>,
    companies: Company[],
    setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>

}


export const formEventSchema = z.object({
    eventName: z.string().min(2).max(50),
    companieSelected: z.object({
        name: z.string().min(2),
        id: z.string()
    })
})


export default function FormEvents(props: FormEventsProps) {
    const { setNewEvent, setOpen, companies, setOnSaveNewEvent } = props
    const [selectedCompany, setSelectedCompany] = useState({
        name: "",
        id: ""
    })
    const form = useForm<z.infer<typeof formEventSchema>>({
        resolver: zodResolver(formEventSchema),
        defaultValues: {
            eventName: "",
            companieSelected: {
                name: "",
                id: ""
            }
        }   
      })
    
    function onSubmit(values: z.infer<typeof formEventSchema>){
        setNewEvent(values)
        setOpen(false)
        setOnSaveNewEvent(true)
        
    }


    const handleCompanyChange = (newValue: string) => {
        const selectedItem = companies.find(company => company.id == newValue)
        if (selectedItem) {
            setSelectedCompany({
                name: selectedItem.name,
                id: selectedItem.id
            })
            form.setValue("companieSelected.name", selectedItem.name)
            form.setValue("companieSelected.id", selectedItem.id)
        }
    }
    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField control={form.control} name="eventName" render={({field}) => (
                    <FormItem>
                        <FormLabel>Event name</FormLabel>
                        <FormControl>
                            <Input placeholder="Meeting..." type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

        <FormField control={form.control} name="companieSelected.name" render={({field}) => (
                    <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <Select onValueChange={(newValue) => {field.onChange(newValue); handleCompanyChange(newValue)} } defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a company"/>
                        </SelectTrigger>    
                        </FormControl>

                        <SelectContent>
                            {companies.map((companie) => (
                                <SelectItem key={companie.id} value={companie.id}>{companie.name}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                       
                        <FormMessage />
                    </FormItem>
                )}/>
                <Button type="submit">Create Event</Button>
        </form>
    </Form>
  )
}
