import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        // console.log(request.nextUrl.pathname);
        // console.log(request.nextauth.token);
        if (request.nextUrl.pathname.startsWith("/products")
            && request.nextauth.token?.role !== "ADMIN") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
        if (request.nextUrl.pathname.startsWith("/products/new")
        && request.nextauth.token?.role !== "ADMIN") {
        return NextResponse.rewrite(
            new URL("/denied", request.url)
        )
    }

    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
)

export const config = {matcher: ["/product"]}
