"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// UI
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type FormCreateProps = {
    setOpenModalCreate: Dispatch<SetStateAction<boolean>>
}

const formSchema = z.object({
    name: z.string().min(1),
    country: z.string().min(2),
    website: z.string().min(2),
    phone: z.string().min(6),
    cif: z.string().min(6),
    profileImage: z.string()

})
interface Data  {
  name: String,
  country: String,
  website: String,
  phone: String,
  cif: String,
  profileImage: String
}
export default function FormCreateCustomer(props: FormCreateProps) {
  const { setOpenModalCreate } = props
  const router = useRouter()
//   const [photoUploaded, setPhotoUploaded] = useState<ChangeEvent<HTMLInputElement>>()
  const photo = useRef<HTMLInputElement>(null)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        country: "",
        website: "",
        phone: "",
        cif: "",
        profileImage: ""
    },
  })
  const { isValid } = form.formState

  async function onSubmit(values: z.infer<typeof formSchema>){

    const file = photo.current?.files?.[0]
    if (!file) return
    const form = new FormData()
    form.append('file', file)
    for (const key in values) {
      form.append(key, values[key as keyof Data] as string | Blob)
    }

    try {
      const pet = await fetch('/api/companies', {
        method: "POST",
        body: form
          })
    const res = await pet.json()
    router.refresh()
    toast({title: "Company created", variant: "default"})
    setOpenModalCreate(false)
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive"
      })
    }
    
    
  }
  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
                <div className='grid grid-cols-2 gap-3'>
                <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                          <Input placeholder='Company Name..'  {...field}  />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="country" render={({ field }) => (
                      <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select the country"></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='united-states'>United States</SelectItem>
                        <SelectItem value='united-kingdom'>United Kingdom</SelectItem>
                        <SelectItem value='spain'>Spain</SelectItem>
                        <SelectItem value='portugal'>Portugal</SelectItem>
                        <SelectItem value='grecia'>Grecia</SelectItem>
                        <SelectItem value='italia'>Italia</SelectItem>
                      </SelectContent>
                      </Select>
                      <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="website" render={({ field }) => (
                      <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                          <Input placeholder='www.website.com' type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                          <Input placeholder='+34 665 55 55 55' type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="cif" render={({ field }) => (
                      <FormItem>
                      <FormLabel>CIF</FormLabel>
                      <FormControl>
                          <Input placeholder='B-1234567' type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="profileImage" render={({ field }) => (
                      <FormItem>
                      <FormLabel>Profile Image</FormLabel>
                      <FormControl>
                          <Input  type='file' ref={photo}/>
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                )} />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </Form>

      
    </div>
  )
}
