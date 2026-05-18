import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export const proxy = async (request) => {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (session) {
        return NextResponse.next();
    }

    const loginUrl = new URL("/signin", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
};

export const config = {
    matcher: ["/dashboard/:path*", "/doctors/:path*"],
};