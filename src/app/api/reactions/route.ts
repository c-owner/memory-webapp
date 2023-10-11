import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import axios from 'axios';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    const { reactionStatus, memoryId } = await req.json();

    return axios
        .post(
            `${process.env.API_DOMAIN}/memories/${memoryId}/reactions/new`,
            {
                reactionStatus
            },
            {
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }
        )
        .then((res) => NextResponse.json(res.data, { status: 200 }))
        .catch((err) => NextResponse.json(err, { status: err.status }));
}
