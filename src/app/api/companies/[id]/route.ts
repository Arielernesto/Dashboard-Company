import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs"
import { writeFile } from 'fs/promises'
import { join } from "path";
import { UTApi } from 'uploadthing/server'
import { nameFromURL } from "@/lib/utils";

const uploadthing = new UTApi()

export async function PUT(request: Request, {params}: {params: {id: string}}){
    
    try {
     const fields = await request.formData()
     const data: { [key: string]: any} = {}
     fields.forEach((value, key) => {
      data[key] = value
     })
     let pathname : any
     if (data.file !== '') {
        const nameFile = nameFromURL(data.image) 
        const deleteFile = await uploadthing.deleteFiles(nameFile)
        const response : any = await uploadthing.uploadFiles(data.file)
        pathname = response.data?.url
     } else {
        pathname = data.image
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
        const nameFile = nameFromURL(company.profileImage) 
        const response = await uploadthing.deleteFiles(nameFile)
        return NextResponse.json(company, {status: 200})
    } catch (error) {
        return NextResponse.json([error, "Ha ocurrido un error"], {status: 500})
    }
}