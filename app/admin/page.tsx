

'use client'
import React from 'react'
import { useSession } from "next-auth/react"
import SideBar from '../SideBar';

const AdminPage = () => {
    const { data: session } = useSession();

  return (
    <div>
        {
        session ? (
          <div className='flex space-x-5'>
            
            <div>
    <p>{session?.user?.role}</p>

            <p>{session?.user?.name}</p>
            
            <p>{session?.user?.id}</p>

    

            </div>
       
    
          </div>
        ) : <h1>Hello world</h1>
        }
    </div>
  )
}

export default AdminPage