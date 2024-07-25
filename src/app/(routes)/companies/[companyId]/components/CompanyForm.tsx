"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from "next/navigation";
import { useRef } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Company } from "@prisma/client";
import { useImageStore } from "@/store/ImageStore";

export type CompanyFormProps = {
    company: Company;
}


export const formSchema = z.object({
    name: z.string().min(2),
    country: z.string().min(2),
    website: z.string().min(2),
    phone: z.string().min(6),
    cif: z.string().min(6),
    profileImage: z.string(),
    description: z.string().nullable()
})
interface Data  {
    name: String,
    country: String,
    website: String,
    phone: String,
    cif: String,
    profileImage: String
  }
export default function CompanyForm(props: CompanyFormProps) {
  const { company } = props 
  const router = useRouter()

  const image = useImageStore(state => state.image)
  const setImage = useImageStore(state => state.setImage)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: company.name,
        country: company.country,
        website: company.website,
        phone: company.phone,
        cif: company.cif,
        profileImage: company.profileImage,
        description: company.description
    }   
  })

  async function handleImage(e: any) {
    setImage(e.target?.files?.[0])
    
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {


    const form = new FormData()
      form.append('file', image)
      form.append("image", company.profileImage)
    for (const key in values) {
      form.append(key, values[key as keyof Data] as string | Blob)
    }

    try {
      const pet = await fetch('/api/companies/' + company.id , {
        method: "PUT",
        body: form
          })
    router.refresh()
    toast({title: "Company Updated!", variant: "default"})
  }
  catch (error) {
    console.log(error)
    toast({title: "Error", variant: "destructive"})
  }
}
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-3">
                <FormField control={form.control} name="name" render={({field}) => (
                    <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Company name..." type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="country" render={({field}) => (
                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                        </FormControl>
                        <FormMessage />

                        <SelectContent>
                                <SelectItem value='united-states'>United States</SelectItem>
                                <SelectItem value='united-kingdom'>United Kingdom</SelectItem>
                                <SelectItem value='spain'>Spain</SelectItem>
                                <SelectItem value='portugal'>Portugal</SelectItem>
                                <SelectItem value='grecia'>Grecia</SelectItem>
                                <SelectItem value='italia'>Italia</SelectItem>
                        </SelectContent>
                        </Select>
                      
                    </FormItem>
                )}/>

                <FormField control={form.control} name="website" render={({field}) => (
                    <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                            <Input placeholder="www.website.com" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="phone" render={({field}) => (
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input placeholder="+34 651 21 21" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="cif" render={({field}) => (
                    <FormItem>
                        <FormLabel>CIF / NIF</FormLabel>
                        <FormControl>
                            <Input placeholder="B-1234567" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="profileImage" render={({field}) => (
                    <FormItem>
                        <FormLabel>Profile Image</FormLabel>
                        <FormControl>
                            <Input  type="file" onChange={() => handleImage(event)} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="description" render={({field}) => (
                    <FormItem>
                        <FormLabel>CIF / NIF</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Description..." {...field} value={form.getValues().description ?? ''}></Textarea>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
            </div>
            <Button type="submit">Edit Company</Button>
        </form>
    </Form>
  )
}
