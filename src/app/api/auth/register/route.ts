import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from 'bcrypt'

export async function POST(request: Request){
    const { name, email, password } = await request.json()
    
    try {
        const passwordHashed = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHashed
            }
        })
        
        return NextResponse.json({password: user.password, email: user.email, status: "ok"}, {status: 200})
    } catch (error) {
        return NextResponse.json(`Error al registrarse en el sistema` ,{status: 500})
    }
    
}