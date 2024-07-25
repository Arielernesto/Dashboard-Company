import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(request: Request, {params}: {params: {id: string}}){
try {
        const values = await request.json()
        const { id } = params
        const contact = await prisma.contact.create({
            data: {
                companyId: id,
                ...values
            }
        })
        return NextResponse.json(contact, {status: 200})
} catch (error) {
    return NextResponse.json(error, {status: 500})
}
}

