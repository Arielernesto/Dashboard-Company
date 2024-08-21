import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { UTApi } from 'uploadthing/server'
import { nameFromURL } from "@/lib/utils";

const uploadthing = new UTApi()

export async function POST(request: Request){
    const { name, email, password } = await request.json()
    
    try {
        
        const passwordHashed = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHashed,
                profile_photo: ""
            }
        })
        
        return NextResponse.json({password: user.password, email: user.email, status: "ok"}, {status: 200})
    } catch (error) {
        return NextResponse.json(`Error at register in the system` ,{status: 500})
    }
    
}

export async function PATCH(request: Request){
   
    const fields = await request.formData()
    const data: { [key: string]: any} = {}
    fields.forEach((value, key) => {
     data[key] = value
    })

    let password = data.hashedPassword
    let pathname : any = ""
    if (data.image !== '') {
       if (data.oldImage !== '') {
       const nameFile = nameFromURL(data.oldImage) 
       const deleteFile = await uploadthing.deleteFiles(nameFile)
       }
       const response : any = await uploadthing.uploadFiles(data.image)
       pathname = response.data?.url
    } else {
       pathname = data.oldImage
    }
    if (data.password !== "") {
    const isValid = await bcrypt.compare(data.oldPassword, data.hashedPassword)
    if (!isValid) return NextResponse.json({error: "The old Password is incorrect!"}, {status: 500})
    if (data.password.length < 6) return NextResponse.json({error: "The new password has minimun 6 characters!"}, {status: 500})
    password = await bcrypt.hash(data.password, 10)
    }
    const UserSchema = z.object({
        name: z.string().min(3)
    })

    const results = UserSchema.safeParse({name: data.name})

    if (results.error) {
        return NextResponse.json({error: "Error at update the profile"}, {status: 401})
    }

    
    try {
        const user = await prisma.user.update({
            where: {
                email: data.email
            },
            data: {
                name: data.name,
                password: password,
                profile_photo: pathname
            }
        })
        return NextResponse.json(user, {status: 200})
    } catch (error) {
        
        return NextResponse.json(`Error at update the profile` ,{status: 500})
    }
}