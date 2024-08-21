"use client" 
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@radix-ui/react-select"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { any, z } from 'zod'
import { Input } from "./ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { useRouter } from "next/navigation"
import { toast } from "./ui/use-toast"

const formSchema = z.object({
    name: z.any(),
    email: z.any(),
    password: z.string(),
    oldPassword: z.string(),
    profile_photo: z.any()
})

interface Data  {
    name: any,
    email: any,
    password: any,
    oldPassword: any,
    profile_photo: any
  }

export default function UserButton(){
    const [mounted, isMounted] = useState(false)
    const [user, setUser] = useState<any>({
        name: "",
        email: "",
        profile_photo: ""
    })
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const { data: session, status } : { update: any; data: any; status: any; } = useSession()



    const router = useRouter()
    //   const [photoUploaded, setPhotoUploaded] = useState<ChangeEvent<HTMLInputElement>>()
       
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            password: "",
            oldPassword: "",
            profile_photo: ""
        },
      })  
      
    
    useEffect(() => {
        if (status !== "loading") {
            setUser({
                name: session?.user?.name,
                email: session?.user?.email,
                profile_photo: ""
            })
            form.setValue('name', session?.user?.name)
            form.setValue('email', session?.user?.email)
            SetPicture(session?.user?.profile_photo)
          
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, session]);

    useEffect(() => {
        isMounted(true)
    }, []);

    async function UpdateProfile(values: z.infer<typeof formSchema>){
    console.log(image)
    const formFields : any = new FormData()
    formFields.append('image', image)
    formFields.append('hashedPassword',session?.user?.password)
    formFields.append('email', session?.user?.email)
    formFields.append('oldImage', session?.user?.profile_photo)
    for (const key in values) {
      formFields.append(key, values[key as keyof Data] as string | Blob)
    }
    console.log(formFields)
        try {
            if (status == "authenticated") {
                const pet = await fetch('/api/auth/register', {
                   method: "PATCH",
                   body: formFields
                })      

                const res = await pet.json()
                if (res.error){
                    toast({title: res.error, variant: "destructive"})
                    return
                }
                toast({title: "Profile updated!", variant: "default"})
                setOpenModalCreate(false)
                router.refresh()
              }
        } catch (error: any) {
            toast({title: error, variant: "destructive"})
        }
      
    }

    const [picture, SetPicture] = useState("")
    const [image, setImage] = useState<any>("")
    useEffect(() => {
        if (image !== "") {
           let file : any = image;
           let reader  = new FileReader();
            reader.onload = (event: any) => {
            SetPicture(event.target.result)
         };
          reader.readAsDataURL(file);
        }
    }, [image]);


    return (
        <div>
        { mounted && status == "authenticated" && 
        <div>
                    <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate} >
                        <DialogTrigger asChild>
                       

                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px] " >
                        <DialogHeader>
                             <DialogTitle>Profile</DialogTitle>
                            <DialogDescription>
                            Customize your profile
                            </DialogDescription>
                        </DialogHeader>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(UpdateProfile)} className="space-y-8" >
                <div className='grid grid-cols-2 md:gap-3 gap-1 '>
                <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                      <FormLabel>Profile name </FormLabel>
                      <FormControl>
                          <Input type="text" placeholder='name...'  {...field}  />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                          <Input placeholder='example@example.com..' type='email' readOnly  {...field}  />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="oldPassword" render={({ field }) => (
                      <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                          <Input placeholder='Write your old password...' type='password' {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="password" render={({ field }) => (
                      <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                          <Input placeholder="Write your new password" type='password' {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                 )} />

                <FormField control={form.control} name="profile_photo" render={({ field }) => (
                    <FormItem>
                    <FormLabel>Profile Photo</FormLabel>
                    <FormControl>
                        <Input type='file' accept="image/*" {...field} onChange={(e) => setImage(e.target?.files?.[0])} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <div className=" flex justify-center">
                    {picture == '' ? (
                         <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-circle avatar-icon md:mt-0 mt-3" viewBox="0 0 16 16">
                         <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
                         <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>
                       </svg> 
                    ) : (
                        <img src={picture} alt="" className=" rounded-full w-[100px] h-[100px] md:mt-0 mt-3" />
                    )

                    }
                </div>
                </div>
                <Button type='submit'>Update Profile</Button>
            </form>
        </Form>
                        </DialogContent>
        </Dialog>

            <DropdownMenu>
            <DropdownMenuTrigger className=" outline-none user-select-none ">
            <div>
            {picture == '' ? (
                         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle avatar-icon cursor-pointer user-select-none w-[40px] h-[40px] rounded-full" viewBox="0 0 16 16">
                         <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
                         <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>
                       </svg> 
                    ) : (
                        <img src={picture} width={40} height={40}  alt="user profile" className="cursor-pointer user-select-none w-[40px] h-[40px] rounded-full"/>
                    )
                }
            </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start"> 
   
            <DropdownMenuItem onClick={() => setOpenModalCreate(true)}>
                                Profile
            </DropdownMenuItem>
                    <Separator />
             <DropdownMenuItem onClick={() => signOut() }>
                        LogOut
            </DropdownMenuItem>
   
            </DropdownMenuContent>
        </DropdownMenu>
        </div>

        }
    </div>
    )
} 