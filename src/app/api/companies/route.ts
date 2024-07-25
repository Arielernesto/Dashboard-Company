import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from 'fs'
import {IncomingForm} from 'formidable'
import { writeFile } from 'fs/promises'
import { NextApiRequest } from "next";
import { error } from "console";
import { join } from "path";

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
       const bytes = await file.arrayBuffer()
       const buffer = Buffer.from(bytes)
       const path = join(process.cwd(), 'public/upload', file.name)
       await writeFile(path, buffer)
    //    return NextResponse.json(data, {status: 200})
       const company = await prisma.company.create({
        data: {
            userId: "0",
            profileImage: `/upload/${file.name}`,
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