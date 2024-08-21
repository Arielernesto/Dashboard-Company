import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { handler } from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export async function POST(request: Request) {
   try {
     const data = await request.json()

     const session : any = await getServerSession(handler)

     const customer = await prisma.customer.create({
         data: {
            userId: session?.user.email,
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

export async function GET(request: Request){
   const customers = await prisma.customer.findMany()
   return NextResponse.json(customers, {status: 200})
}