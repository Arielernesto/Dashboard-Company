import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function DELETE(request: Request, {params}: {params: {id: string, eventId: string}}) {
   try {
     const event = await prisma.event.delete({
         where: {
             id: params.eventId,
             companyId: params.id
         }
     })
     return NextResponse.json(event, {status: 200})
   } catch (error) {
    return NextResponse.json(error, {status: 500})
   }
}