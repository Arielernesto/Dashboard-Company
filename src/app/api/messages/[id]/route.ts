import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
interface Params{
    params: {id: number}
    id: number | string
}

export async function GET(params: Params) {
  console.log(params)
  const note = await prisma.message.findFirst({
    where:{
        id: Number(params.id)
    }
  }) 
  return NextResponse.json(note)
}
export async function DELETE({params}: Params) {
    return NextResponse.json(params)
    console.log(Number(params.id))
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