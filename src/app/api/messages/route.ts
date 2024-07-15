import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
    try {
        const messages = await prisma.message.findMany()
        return NextResponse.json(
            messages, { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            error, {status: 500}
        )
    }
   
}

export async function POST(request: Request){
try { 
        const content = await request.json()
        const newMessage = await prisma.message.create({
            data: {
                content : content
            }
        })
        return NextResponse.json(newMessage)
} catch (error) {
    return NextResponse.json(error)
}
}