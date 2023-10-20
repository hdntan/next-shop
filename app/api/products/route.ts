import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/prisma/client";
// import { useSession } from "next-auth/react"


import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const {name, description, price, brand, category, inStock, images} = body;
    
    const product = await prisma.product.create({
                    data: {
                        name,
                        description, 
                        brand, 
                        category, 
                        inStock, 
                        images,
                        price: parseFloat(price)
        
                    }
                });

    return NextResponse.json(product)
}



export async function GET() {
  
    try {
        const products = await prisma.product.findMany();
    
        return NextResponse.json(products, {status: 201});
        
    } catch (error) {
        return NextResponse.json({message: "GET ERROR", error}, {status: 500})
    }
       
    
    }