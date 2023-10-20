'use client'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({product}) => {

  return (
    <div className=" relative ">
    <div className=" absolute top-0 left-0 py-2 px-4 bg-white bg-opacity-50 ">
        <p className="text-xs leading-3 text-gray-800">New</p>
    </div>
    <div className=" relative group">
        <div className=" flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
        <img className=" w-full" src={product.images[0].image} alt="A girl Posing Img" />
        <div className=" absolute bottom-0 p-8 w-full opacity-0 group-hover:opacity-100">
            <button className=" font-medium text-base leading-4 text-gray-800 bg-white py-3 w-full">Add to bag</button>
            <button className=" bg-transparent font-medium text-base leading-4 border-2 border-white py-3 w-full mt-2 text-white">
                <Link href={`product/${product.id}`}>Quick View</Link>
            </button>
            
        </div>
    </div>
    <p className=" font-normal text-xl leading-5 text-gray-800 md:mt-6 mt-4">{product.name}</p>
    <p className=" font-semibold text-xl leading-5 text-gray-800 mt-4">{product.price}$</p>
    <p className=" font-normal text-base leading-4 text-gray-600 mt-4">2 colours</p>
</div>
  )
}

export default ProductCard