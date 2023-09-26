import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest, event: NextFetchEvent) {
    // 로그인 했을 경우에만 존재함 ( "next-auth.session-token" 쿠키가 존재할 때 )
    const session = await getToken({ req, secret, raw: true });
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/auth/:path*')) {
        if (session) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    } else if (!session) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/auth/:path*']
};
