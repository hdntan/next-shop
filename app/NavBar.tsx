'use client'
import { Button } from 'antd'
import Link from 'next/link'
import React, { use } from 'react'
import { useSession } from "next-auth/react"
import { redirect } from 'next/dist/server/api-utils'
import { usePathname } from 'next/navigation'
import {signIn, signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const route = useRouter()

    const { data: session } = useSession();
//    const {data: session} = useSession({
//     required: true,
//     onUnauthenticated() {
//         redirect()
//     },
//    })
const currentPath = usePathname();
console.log(currentPath);


    const items = [
        {
            label: 'Dashboard',
            href:'/'
        },
        {
            label: 'Profile',
            href:`${session?.user.role === "ADMIN" ? '/admin' :'/profile'}`
        },
    ]

//    if(!session?.user) return

  return (
    <nav className='w-full flex border-b mb-5 py-5 h-14 items-center '>
        <div className='w-full mx-20 flex justify-between items-center'>
        <Link href={'/'}>NEXT SHOP  {session?.user.role}</Link>
        <div className=' flex items-center space-x-6'>
            <ul className='space-x-6'>
                {
                    items.map((item) => <Link href={item.href} key={item.href} className={`${item.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}>{item.label}</Link>)
                }
            </ul>


             {
                !session?.user ? 
                <button onClick={() => signIn()} className='border-2 px-3 py-2 rounded-lg'>
                Sign In 
             </button>
                 : 
                 <button onClick={() => signOut().then(() => {
                    //   alert("account create")
                      route.push('/login')
                      route.refresh
                })} className='border-2 px-3 py-2 rounded-lg'>
                   Sign Out 
                </button>
            }
        
       
        </div>
        
        </div>
       
    </nav>
  )
}

export default NavBar