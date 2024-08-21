import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '../../../../lib/prisma'
import bcrypt from 'bcrypt'


export const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password"},
                profile_photo: { label: "Password", type: "text"}
            },
            async authorize (credentials: any, req) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials?.email
                    }
                })

                if (user && bcrypt.compareSync( credentials.password, user.password)) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks:{
        async jwt({token, user}) {
            return { ...token, ...user}
        },
        async session({session, token}){
            session.user = token
            return session
        }
    }
})

export {handler as GET, handler as POST}