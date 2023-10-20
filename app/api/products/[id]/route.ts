import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, { params }) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      return NextResponse.json({ message: "Issue not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "GET ERROR", error }, { status: 500 });
  }
}


export async function PATCH(request: NextRequest, { params }) {
    try {
      const body = await request.json();
      const {name, description, price, brand, category, inStock, images} = body;
      const { id } = params;
  
      const updateProduct = await prisma.product.update({
        where: {
          id,
        },
        data: {
            name,
            description, 
            brand, 
            category, 
            inStock, 
            images,
            price: parseFloat(price)
        },
      });
      if (!updateProduct) {
        return NextResponse.json({ message: "Issue not found" }, { status: 404 });
      }
  
      return NextResponse.json(updateProduct, { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: "UPDATE ERROR", error }, { status: 500 });
    }
  }

export async function DELETE(request: NextRequest, { params }) {
    try {
      const { id } = params;
       await prisma.product.delete({
        where: {
          id,
        },
      });
      
  
      return NextResponse.json("Issue has been deleted", { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: "DELETE ERROR", error }, { status: 500 });
    }
  }