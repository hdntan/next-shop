'use client'
import React, { useState } from "react";
import CartProduct from "../components/CartClient";
import { useCart } from "../context/useCart";
import CartClient from "../components/CartClient";
import { useRouter } from 'next/navigation';


const CartPage = () => {
    const { cartProducts, handleClearCart, cartTotalAmount, cartTotalQty} = useCart();
   const route = useRouter()
    console.log('cart',cartProducts);
    // const {CartProduct} = useCart()
    const products = [
        {
            id:"1"
        },
        {
            id:"2"
        },
        {
            id:"3"
        },
    ]
  const [show, setShow] = useState(false);
  return (
  
    
       
       
           
                    <div className="flex w-full md:flex-row flex-col justify-center" id="cart">
                  
                    <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                        
                            <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Bag</p>
                            <button onClick={() => {handleClearCart()}} className="border px-3 py-2 mt-5 rounded-lg"> Clear all</button>
                            {
                                  !cartProducts || cartProducts.length === 0 ?  <div>Ban chua co san pham</div>

                               :   cartProducts.map((product) => <CartClient key={product.id} product={product}/>)
                            }
                            
                       
                          
                        </div>
                        <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                            <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                                <div>
                                    <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                                    <div className="flex items-center justify-between pt-16">
                                        <p className="text-base leading-none text-gray-800">Subtotal</p>
                                        <p className="text-base leading-none text-gray-800">${cartTotalAmount}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-5">
                                        <p className="text-base leading-none text-gray-800">Shipping</p>
                                        <p className="text-base leading-none text-gray-800">$30</p>
                                    </div>
                                    {/* <div className="flex items-center justify-between pt-5">
                                        <p className="text-base leading-none text-gray-800">Tax</p>
                                        <p className="text-base leading-none text-gray-800">$35</p>
                                    </div> */}
                                </div>
                                <div>
                                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                        <p className="text-2xl leading-normal text-gray-800">Total</p>
                                        <p className="text-2xl font-bold leading-normal text-right text-gray-800">${cartTotalAmount + 30}</p>
                                    </div>
                                    <button onClick={() => route.push('/checkout')} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

   


  )
}

export default CartPage