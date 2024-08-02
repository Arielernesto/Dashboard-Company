import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(request: Request, {params}: {params: {id: string}}) {
   try {
     const { id } = params
     const data = await request.json()
     const customer = await prisma.customer.update({
         where: {
             id: id
         },
         data: {
             ...data
         }
     })
 
     return NextResponse.json(customer, {status: 200})
   } catch (error) {
        return NextResponse.json(error, {status: 500})
   }
}

export async function DELETE(request: Request, {params}: {params: {id: string}}){
    try {
        const { id } = params
        const customer = await prisma.customer.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json(customer,{status: 200})
    } catch (error) {
        return NextResponse.json(error, {status: 500})
    }
}