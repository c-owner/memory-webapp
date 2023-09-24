// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token
    }
});

export function middleware(request: NextRequest, event: NextFetchEvent) {
    console.log('??');
    // const session = await getToken({ req, secret, raw: true });
    // const { pathname } = req.nextUrl;
    // console.log(request.nextUrl.pathname)
    // console.log(request.nextauth.token)
    console.log('request.nextUrl', request.nextUrl);
    if (request.nextUrl.pathname.startsWith('/')) {
        return NextResponse.rewrite(new URL('/auth/signin', request.url));
    }
    if (request.nextUrl.pathname.startsWith('/user/:path*')) {
        return NextResponse.rewrite(new URL('/auth/signin', request.url));
    }
}
// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = { matcher: ['/auth/signin', '/auth/signin/email', '/auth/signup'] };
export const config = { matcher: ['/'] };
