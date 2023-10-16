'use client'

import { UnorderedListOutlined } from '@ant-design/icons'
import Link from 'next/link';
import { usePathname } from 'next/navigation'

import React from 'react'

const SideBar = () => {
    const currentPath = usePathname();
    console.log(currentPath);
  
    const links = [
      {
        label :"Profile",
        href: "/admin",
        icon: (<UnorderedListOutlined />)
      },
      {
        label :"Product",
        href: "/admin/product",
        icon: (<UnorderedListOutlined />)

      }
    ]
  return (
    <div className="absolute lg:relative w-64 h-screen shadow bg-gray-100 hidden lg:block">
                        <div className="h-16 w-full flex items-center px-8">
                           NEXT SHOP
                        </div>
                        <ul aria-orientation="vertical" className="pl-5">
                        {
                            links.map((link) =>
                            <Link key={link.href} href={link.href} className={`${link.href === currentPath ?' text-indigo-700' : 'focus:text-indigo-700' } pl-6 cursor-pointer  leading-3 tracking-normal pb-4 pt-5  focus:outline-none`}>
                            <div className="flex items-center">
                                <div>
                                {link.icon}
                                </div>
                                <span className="ml-2">{link.label}</span>
                            </div>
                        </Link> )
                        }
                            
                            
                        </ul>
                    </div>
  )
}

export default SideBar