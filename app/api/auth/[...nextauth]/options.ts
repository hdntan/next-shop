import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

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
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials) {
              
                 for(let i = 0; i< users.length; i++)
                 {
                    if(credentials?.username === users[i].name && credentials.password === users[i].password) {
                        return users[i]
                    }
                    
                 }
                 return null
                        
                  
                   
              }
        }),
    ],
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