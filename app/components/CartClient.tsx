'use client'

import React, { useState } from 'react'
import { CartProductType } from '../product/[productId]/ProductDetail'
import { useCart } from '../context/useCart'


interface ProductProps {
    product: CartProductType
}
const CartClient: React.FC<ProductProps> = ({product}) => {
    const {handleDeleteProductToCart, handleCartQtyIncrease, handleCartQtyDecree} = useCart();
    const [count, setCount] = useState(product.quantity);
    const addCount = () => {
        
        setCount((prev) => prev + 1);
        console.log(count);
    };

    const minusCount = () => {
        if (count > 0) {
            setCount((prev) => prev - 1);
        }
    };
  return (
    <div className="md:flex items-center mt-5 py-8 border-t border-gray-200">
    {/* <div className="w-1/4 ">
        <img src={product.selectedImg}  className="w-full h-full object-center object-cover" />
    </div> */}
    <div className="w-24 h-24">
                                            <img className="w-full h-full" src={product.selectedImg} />
                                        </div>
    <div className="md:pl-3 md:w-3/4">
        <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p>
        <div className="flex items-center justify-between w-full pt-1">
            <p className="text-base font-black leading-none text-gray-800">{product.name}</p>
            <div className="flex">
                                <span onClick={() => handleCartQtyDecree(product)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-6 flex items-center justify-center pb-1">
                                    -
                                </span>
                                <input id="counter" aria-label="input" className="border border-gray-300  text-center w-14 h-6 " type="text" value={product.quantity} onChange={(e) => e.target.value} />
                                <span onClick={() => handleCartQtyIncrease(product)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-6 flex items-center justify-center pb-1 ">
                                    +
                                </span>
                            </div>
            {/* <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                <option>01</option>
                <option>02</option>
                <option>03</option>
            </select> */}
        </div>
        {/* <p className="text-xs leading-3 text-gray-600 pt-2">Height: 10 inches</p>
        <p className="text-xs leading-3 text-gray-600 py-4">Color: Black</p>
        <p className="w-96 text-xs leading-3 text-gray-600">Composition: 100% calf leather</p> */}
        <div className="flex items-center justify-between pt-5 pr-6">
            <div className="flex itemms-center">
                <button className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</button>
                <button onClick={() => handleDeleteProductToCart(product)} className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</button>
            </div>
            <p className="text-base font-black leading-none text-gray-800">{product.price * product.quantity}$</p>
        </div>
    </div>
</div>
  )
}

export default CartClient