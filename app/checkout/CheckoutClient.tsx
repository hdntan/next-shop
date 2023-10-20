'use client'

import React, { useEffect, useState } from 'react'
import { useCart } from '../context/useCart'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'

const CheckoutClient = () => {

    const {cartProducts, paymentIntent, handleSetPaymentIntent} = useCart()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState('')

    const route = useRouter()
    console.log('payment', paymentIntent)
    console.log('clientsecret', clientSecret)


    const handleCheckOut = async() => {
        try {
            if(cartProducts) {
                await  axios.post('/api/create-payment', cartProducts).then(() => {
                    alert("account create")})
                  route.push('/')
                  route.refresh
            }
          
           
        } catch (error) {
            console.log('Error',error)
              toast.error('something went wrong')
        }
    }    
    // useEffect(() => {
    //     if(cartProducts) {
    //         setLoading(true)
    //         setError(false)
    //         fetch('/api/create-payment', {
    //             method: 'POST',
    //             headers: {'Content-Type':'application/json'},
    //             body: JSON.stringify({
    //                 items: cartProducts,
    //             })
    //         }).then((res) => {
    //             setLoading(false)
    //             if(res.status === 401) {
    //                 return route.push('/login')
    //             }
    //             return res.json( )
    //         }).catch((error) => {
    //             setError(true)
    //             console.log('Error',error)
    //             toast.error('something went wrong')
    //         })
    //     }
    // },[cartProducts, paymentIntent])
  return (
    <div>
        <button className='mt-10 ml-20 border-2 px-3 py-2' onClick={handleCheckOut}>CheckOut</button>
    </div>
  )
}

export default CheckoutClient