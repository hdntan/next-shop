import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()
const users = [
    {
    id:"1",
    name:"user1",
    password:"user123",
    role:"admin"
},
{
    id:"2",
    name:"user2",
    password:"user123",
    role:"user"
},

]

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials) {
                if(!credentials?.email || !credentials.password) {
                    throw new Error('Invalid email or password')
                }
                
                 const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                 })

                 if(!user || !user?.hashedPassword) {
                    throw new Error('Invalid email or password')
                 }

            
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )
                if(!isCorrectPassword) {
                    throw new Error("Invalid email or password")
                }
                return user
                  
                   
              }
        }),
    ],
    pages: {
        signIn:'/login'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy:'jwt'
    },
secret: process.env.NEXTAUTH_SECRET, 
    callbacks: {
        async jwt({token, user}) {
            if(user) token.role = user.role
            return token
        },
         async session({session, token}) {
            if(session?.user) session.user.role = token.role
            return session
         }
    }
}