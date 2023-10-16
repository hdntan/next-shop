
'use client'
import React from 'react'
import { useSession } from "next-auth/react"


const ProfilePage = () => {
    const { data: session } = useSession();

  return (
    <div>{
        session ? (
          <div>
        <p>{session?.user?.name}</p>
    
        <p>{session?.user?.role}</p>
    
          </div>
        ) : <h1>Hello world</h1>
        }</div>
  )
}

export default ProfilePage