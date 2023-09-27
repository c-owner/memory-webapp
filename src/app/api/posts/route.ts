import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { Comment } from '@/model/post';

export async function GET() {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    return axios
        .get(`${process.env.API_DOMAIN}/memories`, {
            headers: {
                Authorization: accessToken
            }
        })
        .then((res) => NextResponse.json(res.data.responseObject.content || [], { status: 200 }))
        .catch((err) => NextResponse.json(err, { status: err.status }));
}
