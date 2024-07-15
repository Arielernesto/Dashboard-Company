import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
interface Params{
    params: {id: number}
    id: number | string
}

export async function GET(request: Request, {params}: Params) {
  console.log(params)
  const note = await prisma.message.findFirst({
    where:{
        id: Number(params.id)
    }
  }) 
  return NextResponse.json(note)
}
export async function DELETE(request: Request,{params}: Params) {
   try {
     const deletedNote = await prisma.message.delete({
         where: {
             id: Number(params.id)
         }
     })
     return NextResponse.json(deletedNote, {status: 200})
   } catch (error) {
    return NextResponse.json(error, {status: 500})
   }
}