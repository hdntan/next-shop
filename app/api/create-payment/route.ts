import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import Stripe from "stripe";
import { CartProductType } from "@/app/product/[productId]/ProductDetail";
import { getServerSession } from "next-auth";
import {options} from '../auth/[...nextauth]/options'


// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, 
//     {
//         apiVersion: "2023-10-16"
//    });

   const calculateOrderAmount = (item: CartProductType[]) => {
    const totalPrice = item.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;
        return acc + itemTotal;
    },0)
    return totalPrice;
   }

//    export async function POST(request:NextRequest) {

// console.log('session', session?.user.id)
// if(!session) {
//     return NextResponse.json({error:"Unauthorized" }, {status: 401})
// }

// const body =await request.json();
// const {items, payment_intent_id} = body
// const total = calculateOrderAmount(items) * 100
// const orderData = {
//     user: {connect: {id: session?.user.id}},
//     amount: total,
//     currency: 'usd',
//     status: "pending",
//     deliveryStatus: "pending",
//     paymentIntenId: payment_intent_id,
//     products: items
// }

// if(payment_intent_id) {
//     const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);
//     if(current_intent) {
//         const update_intent = await stripe.paymentIntents.update(
//             payment_intent_id,
//             {amount: total}
//         )

//         const [existing_order, update_order] = await Promise.all([
//             prisma.order.findFirst({
//                 where: {paymentIntenId: payment_intent_id}
//             }),
//             prisma.order.update({
//                 where: {paymentIntenId:payment_intent_id},
//                 data: {
//                     amount: total,
//                     products: items
//                 }
//             })
    
//         ])
//         if(!existing_order) {
//             return NextResponse.json({
//                 error: "Invalid Payment Intent"
//             },
//             {
//                 status: 400
//             }
//             );
//         }
    
//         return NextResponse.json({paymentIntent: update_intent})
        
//     }
  

// } else {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: total,
//         currency: "usd",
//         automatic_payment_methods: {
//             enabled: true
//         }
//     });

//     orderData.paymentIntenId = paymentIntent.id;
//     await prisma.order.create({
//         data: orderData
//     });
//     return NextResponse.json({paymentIntent})
// }
    
//    }

export async function POST(request: NextRequest) {
const session = await getServerSession(options);

 try {
    const body = await request.json()
    const {items} = body
   const total = calculateOrderAmount(items) * 100
   const orderData = {
       user: {connect: {id: session?.user.id}},
       amount: total,
       currency: 'usd',
       status: "pending",
       deliveryStatus: "pending",
       paymentIntenId: "payment_intent_id",
       products: items
   }
   const newOrder = await  prisma.order.create({
       data: orderData
   })

   return NextResponse.json(newOrder, {status: 201})
 } catch (error) {
    return NextResponse.json({message: "POST ERROR", error}, {status: 500})
 }
   
}