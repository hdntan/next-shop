import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const {name, email, password} = body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await  prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    })

    return NextResponse.json(user)
}