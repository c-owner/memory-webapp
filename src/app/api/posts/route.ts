import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }
    const url = new URL(req.url || '');
    const searchParams = new URLSearchParams(url.search);

    return axios
        .post(
            `${process.env.API_DOMAIN}/memories?size=${searchParams.get(
                'size'
            )}&page=${searchParams.get('page')}`,
            {},
            {
                headers: {
                    Authorization: accessToken
                }
            }
        )
        .then((res) => {
            const newPosts = res.data.responseObject.filter(
                (post: { isDeleted: boolean }) => !post.isDeleted
            );
            return NextResponse.json(newPosts || [], { status: 200 });
        })
        .catch((err) => NextResponse.json(err, { status: err.status }));
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    const { content } = await req.json();
    return axios
        .post(
            `${process.env.API_DOMAIN}/memories/new`,
            { content },
            {
                headers: {
                    Authorization: accessToken
                }
            }
        )
        .then((res) => NextResponse.json(res.data, { status: 200 }))
        .catch((err) => NextResponse.json(err, { status: err.status }));
}
