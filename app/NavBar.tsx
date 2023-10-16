'use client'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import { useSession } from "next-auth/react"
import { redirect } from 'next/dist/server/api-utils'
import { usePathname } from 'next/navigation'

const NavBar = () => {
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
            href:`${session?.user.role === "admin" ? '/admin' :'/profile'}`
        },
    ]

//    if(!session?.user) return

  return (
    <nav className='w-full flex border-b mb-5 py-5 h-14 items-center '>
        <div className='w-full mx-20 flex justify-between items-center'>
        <Link href={'/'}>NEXT SHOP ADMIN</Link>
        <div className=' flex items-center space-x-6'>
            <ul className='space-x-6'>
                {
                    items.map((item) => <Link href={item.href} key={item.href} className={`${item.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}>{item.label}</Link>)
                }
            </ul>
        <button className='border-2 px-3 py-2 rounded-lg'>
            {
                !session?.user ? <Link href={"/api/auth/signin/credentials"}>Login</Link> : <Link href={"/api/auth/signout/credentials"}>Logout</Link>
            }
            
        </button>
        </div>
        
        </div>
       
    </nav>
  )
}

export default NavBar