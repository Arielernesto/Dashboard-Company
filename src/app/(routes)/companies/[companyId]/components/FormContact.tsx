"use client"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

export type FormContactsProps = {
    setOpen: Dispatch<SetStateAction<boolean>>,
    mounted: boolean
}

export const formContactSchema = z.object({
    name: z.string().min(2).max(50),
    role: z.string(),
    email: z.string(),
    phone: z.string()
})

export default function FormContact(props: FormContactsProps) {
  const { setOpen, mounted } = props
  const params = useParams<{companyId: string}>()
  const router = useRouter()

  const form = useForm<z.infer<typeof formContactSchema>>({
    resolver: zodResolver(formContactSchema),
    defaultValues: {
        name: "",
        role: "",
        email: "",
        phone: ""
    }   
  })

  const onSubmit = async (values: z.infer<typeof formContactSchema>) => {
    try {
        const pet = await fetch(`/api/companies/${params.companyId}/contact`, {
            method: "POST",
            body: JSON.stringify(values)
        })
        router.refresh()
        setOpen(false)
        toast({title: "Contact created!", variant: "default"})
    } catch (error) {
        toast({title: "Error", variant: "destructive"})
    }
  }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className='md:grid-cols-2 grid gap-4'>
        <FormField control={form.control} name="name" render={({field}) => (
                    <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Contact name..." type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
         <FormField control={form.control} name="email" render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="youremail@provider.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="phone" render={({field}) => (
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input placeholder="+34 564 44 44" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

            <FormField control={form.control} name="role" render={({field}) => (
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>

                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select the Role"></SelectValue>
                            </SelectTrigger>    
                        </FormControl>
                        <SelectContent>
                        <SelectItem value='Comercial'>Comercial</SelectItem>
                        <SelectItem value='CEO'>CEO</SelectItem>
                        <SelectItem value='Quality'>Quality</SelectItem>
                        <SelectItem value='Analytics'>Analytics</SelectItem>
                        <SelectItem value='Other'>Other...</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}/>
                </div>

                <div className=' flex justify-center mt-5'>
                    { mounted &&
                <Button type='submit' className=' w-full md:w-[50%]'>Save Contact</Button>
                      }
                </div>
        </form>
    </Form>
  )
}
