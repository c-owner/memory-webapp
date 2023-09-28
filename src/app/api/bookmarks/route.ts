import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    return axios
        .get(`${process.env.API_DOMAIN}/saved-memories`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => NextResponse.json(res.data.responseObject.content || [], { status: 200 }))
        .catch((err) => NextResponse.json(err, { status: err.status }));
}
