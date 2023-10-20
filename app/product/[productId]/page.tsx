
'use client'
import React from 'react'
import ProductDetails from './ProductDetail'
import { useParams } from 'next/navigation';

import { listProduct } from '@/libs/listProduct';

const Product = () => {
    const params = useParams();
   console.log(params);

   const product = listProduct.find((item) => item.id === params.productId)
   console.log('itemView', product);
  return (
    <div>
     
        <ProductDetails product={product}/>
    </div>
  )
}

export default Product