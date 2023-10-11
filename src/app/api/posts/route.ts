import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    return axios
        .post(
            `${process.env.API_DOMAIN}/memories`,
            {},
            {
                headers: {
                    Authorization: accessToken
                }
            }
        )
        .then((res) => {
            return NextResponse.json(res.data.responseObject || [], { status: 200 });
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
    console.log(content.length);
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
