

import { ShoppingCartOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React from 'react'
import { useCart } from '../context/useCart'

const CartCount = () => {
    const {cartTotalQty} = useCart()
  return (
    <Link href={'/cart'} className='relative cursor-pointer'>
        <div className='text-3xl'>
        <ShoppingCartOutlined />

        </div>
        <span className='absolute top-[-3px] right-[-10px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm'>{cartTotalQty}</span>
    </Link>
  )
}

export default CartCount