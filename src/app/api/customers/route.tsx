import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function POST(request: Request) {
   try {
     const data = await request.json()

     console.log(data.expire)
     const customer = await prisma.customer.create({
         data: {
            name: data.name,
            email: data.email,
            amount: data.amount,
            expire: data.expire
         }
     })
 
     return NextResponse.json(customer, {status: 200})
   } catch (error) {
    return NextResponse.json(error, {status: 500})
   }
}