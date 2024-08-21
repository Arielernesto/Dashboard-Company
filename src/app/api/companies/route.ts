import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UTApi } from 'uploadthing/server'
import { handler } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth"

const uploadthing = new UTApi()

export async function POST(request: NextRequest){
   try {
       const fields = await request.formData()
       const data: { [key: string]: any} = {}
       fields.forEach((value, key) => {
        data[key] = value
       })
       const file: File | null = fields.get('file') as unknown as File
       if (!file) {
       return NextResponse.json({error: "El archivo no existe"}, {status: 500})
       }
       const response : any = await uploadthing.uploadFiles(file)
       const session : any = await getServerSession(handler)
    //    return NextResponse.json(data, {status: 200})
       const company = await prisma.company.create({
        data: {
            userId: session?.user.email,
            profileImage: response.data?.url,
            name: data.name,
            description: "",
            cif: data.cif,
            phone: data.phone,
            country: data.country,
            website: data.website    
        }
       })
       return NextResponse.json(company, {status: 200})

   } catch (error) {
    return NextResponse.json(error, {status: 500})
    
   }
    
}