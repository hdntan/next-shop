'use client'

import { CartContextProvider } from "../context/useCart"

interface CartProviderProps{
    children: React.ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
 return (
    <CartContextProvider>
        {
            children    
        }
    </CartContextProvider>
 )
}