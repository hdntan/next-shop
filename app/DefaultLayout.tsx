

import React, { PropsWithChildren } from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'
import Footer from './Footer'

const DefaultLayout = ({children}: PropsWithChildren) => {
  return (
    <div className='w-full h-full flex flex-col'>
        <NavBar/>
        <div className='flex space-x-6'>
            {/* <SideBar/> */}
            {children}
        </div>
       
        <Footer/>
    </div>
  )
}

export default DefaultLayout