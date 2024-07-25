import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request, {params}: {params: {id: string}}) {
    try {
        const data = await request.json()
    
        const company = await prisma.company.findUnique({
            where: {
                id: params.id
            }
        })
        if (!company) {
            return NextResponse.json("Company not found", {status: 500})
        }
    
        const event = await prisma.event.create({
            data: {
                companyId: params.id,
                ...data
            }
        })
    
        return NextResponse.json(event,{status: 200})

    } catch (error) {
        return NextResponse.json(error, {status: 500})
    }
}