import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import axios from 'axios';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
    }
    const url = new URL(req.url || '');
    const searchParams = new URLSearchParams(url.search);

    return axios
        .post(
            `${process.env.API_DOMAIN}/members?size=${searchParams.get(
                'size'
            )}&page=${searchParams.get('page')}`,
            {},
            {
                headers: {
                    Authorization: accessToken
                }
            }
        )
        .then((res) => NextResponse.json(res.data.responseObject || [], { status: 200 }))
        .catch((err) => NextResponse.json(err, { status: err.status }));
}
