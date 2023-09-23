import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        redirect('/auth/signin');
    }

    return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/:path*'
};
