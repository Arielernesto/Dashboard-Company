"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useSession, signIn } from 'next-auth/react'
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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function Login() {
    const {data: session, status} = useSession()
    const router = useRouter()
  //   const [photoUploaded, setPhotoUploaded] = useState<ChangeEvent<HTMLInputElement>>()
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          
          email: "",
          password: "",
      },
    })
  
    async function onSubmit(values: z.infer<typeof formSchema>){
        const login = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password
        })
        if (login?.error) {
            toast({title: "Login Failed", variant: "destructive"})
        }
        else{
          router.replace("/")
        }
    }
  return (
    <Form {...form}>
  
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full  p-6 bg-[#fafcfb] dark:bg-secondary rounded-lg md:mt-20 mt-5" >
        <h2 className="text-center font-bold text-xl">Login</h2>
        <div className=''>
      

        <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                  <Input placeholder='example@example.com..' type='email'  {...field}  />
              </FormControl>
              <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                  <Input placeholder='Write your password...' type='password' {...field} />
              </FormControl>
              <FormMessage />
          </FormItem>
        )} />

        </div>
        <Button type='submit' className=' w-full'>Login</Button>
    </form>
</Form>
  )
}
