import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '../../../../lib/prisma'
import bcrypt from 'bcrypt'


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password"}
            },
            async authorize (credentials, req) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials?.email
                    }
                })

                if (user && bcrypt.compareSync(credentials?.password, user.password)) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    }
})

export {handler as GET, handler as POST}