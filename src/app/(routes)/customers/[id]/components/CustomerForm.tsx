"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {  Customer } from "@prisma/client";

export type CompanyFormProps = {
    customer: Customer
}

const formSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    amount: z.string(),
    expire: z.string(),
    status: z.string()
})

export default function CustomerForm(props: CompanyFormProps) {
  const { customer } = props 
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: customer.name,
        email: customer.email,
        amount: customer.amount,
        expire: customer.expire,
        status: customer.status
    }   
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      const pet = await fetch('/api/customers/' + customer.id , {
        method: "PUT",
        body: JSON.stringify(values)
          })
    router.refresh()
    toast({title: "Customer Updated!", variant: "default"})
  }
  catch (error) {
    toast({title: "Error", variant: "destructive"})
  }
}
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-3">
                <FormField control={form.control} name="name" render={({field}) => (
                    <FormItem>
                        <FormLabel>Customer Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Customer name..." type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="email" render={({field}) => (
                     <FormItem>
                     <FormLabel>Customer Email</FormLabel>
                     <FormControl>
                         <Input placeholder="Customer email..." type="email" {...field} />
                     </FormControl>
                     <FormMessage />
                 </FormItem>
                )}/>

                <FormField control={form.control} name="amount" render={({field}) => (
                    <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                            <Input placeholder="00.00" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="expire" render={({field}) => (
                    <FormItem>
                        <FormLabel>Expire</FormLabel>
                        <FormControl>
                            <Input  type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="status" render={({field}) => (
                    <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                        </FormControl>
                        <FormMessage />

                        <SelectContent>
                                <SelectItem value='0'>Procesing</SelectItem>
                                <SelectItem value='1'>Success</SelectItem>
                                <SelectItem value='100'>Failed</SelectItem>
                        </SelectContent>
                        </Select>
                      
                    </FormItem>
                )}/>
            </div>
            <Button type="submit">Edit Customer</Button>
        </form>
    </Form>
  )
}
