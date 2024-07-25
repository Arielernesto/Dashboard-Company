import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs"
import { writeFile } from 'fs/promises'
import { join } from "path";

export async function PUT(request: Request, {params}: {params: {id: string}}){
    
    try {
     const fields = await request.formData()
     const data: { [key: string]: any} = {}
     fields.forEach((value, key) => {
      data[key] = value
     })
     console.log(data)
     let pathname
     if (data.file !== '') {
            const relativePath = join(process.cwd(), 'public', data.image)
            fs.unlinkSync(relativePath)
            const bytes = await data.file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const path = join(process.cwd(), 'public/upload', data.file.name)
            await writeFile(path, buffer)
            pathname = `/upload/${data.file.name}`
     } else {
        console.log("process")
        pathname = data.image
        console.log({ok: "si", pathname})
     }
     const company = await prisma.company.update({
         where: {
             id: params.id
         },
         data: {
             profileImage: pathname,
             name: data.name,
             description: data.description,
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

export async function DELETE(request: Request, {params}: {params: {id: string}}){
    try {
        const {id} = params
        const company = await prisma.company.delete({
            where: {
                id: id
            }
        })
        const relativePath = join(process.cwd(), 'public', company.profileImage)
        fs.unlinkSync(relativePath)
        return NextResponse.json(company, {status: 200})
    } catch (error) {
        return NextResponse.json([error, "Ha ocurrido un error"], {status: 500})
    }
}