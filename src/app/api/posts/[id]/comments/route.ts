import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import axios from 'axios';

type Context = {
    params: {
        id: string;
    };
};
export async function POST(req: NextRequest, context: Context) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    const { content } = await req.json();
    return axios
        .post(
            `${process.env.API_DOMAIN}/memories/${context.params.id}/comments/new`,
            { content },
            {
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((res) => NextResponse.json(res.data, { status: 200 }))
        .catch((err) => NextResponse.json(err, { status: err.status }));
}
