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
import { Dispatch, SetStateAction, useRef} from 'react'
import { useRouter } from 'next/navigation'

type FormCreateProps = {
    setOpenModalCreate: Dispatch<SetStateAction<boolean>>
}

const formSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    amount: z.string(),
    expire: z.string()
})
interface Data  {
    name: String,
    email: String,
    amount: String,
    expire: String
}
export default function FormCreateCustomer(props: FormCreateProps) {
  const { setOpenModalCreate } = props
  const router = useRouter()
//   const [photoUploaded, setPhotoUploaded] = useState<ChangeEvent<HTMLInputElement>>()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        email: "",
        amount: "",
        expire: ""
    },
  })
  const { isValid } = form.formState

  async function onSubmit(values: z.infer<typeof formSchema>){

    try {
      const pet = await fetch('/api/customers', {
        method: "POST",
        body: JSON.stringify(values)
          })
    const res = await pet.json()

    router.refresh()
    toast({title: "Customer created", variant: "default"})
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
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl>
                          <Input placeholder='Customer Name..'  {...field}  />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                          <Input placeholder='Customer Email..' type='email'  {...field}  />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="amount" render={({ field }) => (
                      <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                          <Input placeholder='00.00' type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="expire" render={({ field }) => (
                      <FormItem>
                      <FormLabel>Expire</FormLabel>
                      <FormControl>
                          <Input className=' justify-between' type='date' {...field} />
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
