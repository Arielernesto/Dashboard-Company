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
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirm: z.string().min(6)
})

export default function Register() {
    const {data: session, status} = useSession()
    console.log({session, status})
    const router = useRouter()
  //   const [photoUploaded, setPhotoUploaded] = useState<ChangeEvent<HTMLInputElement>>()
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          name: "",
          email: "",
          password: "",
          passwordConfirm: ""
      },
    })
  
    async function onSubmit(values: z.infer<typeof formSchema>){
  
      if (values.password !== values.passwordConfirm) {
        toast({
            title: "You has write diferents passwords",
            variant: "destructive"
          })
          return
      }
      try {
        const pet = await fetch('/api/auth/register', {
          method: "POST",
          body: JSON.stringify(values)
            })
      const res = await pet.json()
      if (res.status == "ok") {
        const login = await signIn("credentials", {
            redirect: false,
            email: res.email,
            password: values.password
        })
        if (login?.error) {
            console.log(login.error)
        } else {
            router.push("/")
        }
      }
      // router.refresh()
      toast({title: "User registered!", variant: "default"})
      } catch (error) {
        toast({
          title: "An error ocurred",
          variant: "destructive"
        })
      }
      
    }
  return (
    <Form {...form}>
    <h2 className="text-center font-bold text-xl">Register</h2>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full" >
        <div className=''>
        <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                  <Input placeholder='Username..'  {...field}  />
              </FormControl>
              <FormMessage />
          </FormItem>
        )} />

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
                  <Input placeholder='Write your password' type='password' {...field} />
              </FormControl>
              <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="passwordConfirm" render={({ field }) => (
              <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                  <Input placeholder='Confirm your password' type='password' {...field} />
              </FormControl>
              <FormMessage />
          </FormItem>
        )} />

        </div>
        <Button type='submit' className=' w-full'>Register</Button>
    </form>
</Form>
  )
}
