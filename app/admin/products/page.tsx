

import Link from 'next/link'
import React, { useState } from 'react'

async function getData() {
    const res = await fetch('http://localhost:3000/api/products', {cache: 'no-store'});
    if(!res.ok) {
      throw new Error("Failed to fetch data ");
    }
  
    return res.json();
  }

const ProductsPage = async() => {
    const products = await getData();
    console.log('products', products);
  return (
    <>
            <div className="w-full sm:px-6">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Projects</p>
                        <div>
                            <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                                <Link href={'products/new'} className="text-sm font-medium leading-none text-white">New Project</Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-normal text-left pl-4">STT</th>
                                <th className="font-normal text-left pl-12">Image</th>
                                <th className="font-normal text-left pl-12">Name</th>
                                <th className="font-normal text-left pl-20">Price</th>
                                <th className="font-normal text-left pl-20">Brand</th>
                                <th className="font-normal text-left pl-16">Category</th>
                                <th className="font-normal text-left pl-16">inStock</th>

                                <th className="font-normal text-left pl-16">Edit</th>
                                <th className="font-normal text-left pl-16">Delete</th>


                            </tr>
                        </thead>
                        {
                            products.map((product, index) =>    
                            <tbody key={product.id} className="w-full">
                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                            <td className="pl-4 cursor-pointer">
                                    <p className="text-sm font-medium leading-none text-gray-800">{index+=1}</p>
                                    
                                </td>
                                <td className="pl-12 cursor-pointer">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10">
                                            <img className="w-full h-full" src={product.images[0].image} />
                                        </div>
                                        {/* <div className="pl-4">
                                            <p className="font-medium">UX Design &amp; Visual Strategy</p>
                                            <p className="text-xs leading-3 text-gray-600 pt-2">Herman Group</p>
                                        </div> */}
                                    </div>
                                </td>
                               
                                <td className="pl-12">
                                    <p className="font-medium">{product.name}</p>
                                    {/* <p className="text-xs leading-3 text-gray-600 mt-2">5 tasks pending</p> */}
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium">{product.price}</p>
                                    {/* <p className="text-xs leading-3 text-gray-600 mt-2">$4,200 left</p> */}
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium">{product.brand}</p>
                                    {/* <p className="text-xs leading-3 text-gray-600 mt-2">34 days</p> */}
                                </td>
                                <td className="pl-16">
                                <p className="font-medium">{product.category}</p>
                                   
                                </td>
                                <td className="pl-16">
                                <p className="font-medium">{product.inStock === true ? 'OK' : 'NO'}</p>
                                   
                                </td>
                                <td className="pl-16">
                                <p className="font-medium">edit</p>
                                   
                                </td>
                                <td className="pl-16 pr-5">
                                <p className="font-medium">delete</p>
                                   
                                </td>
                            </tr>
                           
                            
                        </tbody>
                            
                            
                            
                            )
                        }
                     
                    </table>
                </div>
            </div>
        </>
  )
}

export default ProductsPage