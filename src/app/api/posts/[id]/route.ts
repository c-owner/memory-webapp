import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

type Context = {
    params: {
        id: string;
    };
};
export async function GET(req: NextRequest, context: Context) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    const memoryId = context.params.id;

    return axios
        .get(`${process.env.API_DOMAIN}/memories/${memoryId}`, {
            headers: {
                Authorization: accessToken
            }
        })
        .then((res) => NextResponse.json(res.data.responseObject.content || [], { status: 200 }))
        .catch((err) => NextResponse.json(err, { status: err.status }));
}

export async function PATCH(req: NextRequest, context: Context) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    const { content } = await req.json();
    const memoryId = context.params.id;
    return axios
        .patch(
            `${process.env.API_DOMAIN}/memories/${memoryId}`,
            { content },
            {
                headers: {
                    Authorization: accessToken
                }
            }
        )
        .then((res) =>
            NextResponse.json(res.data.responseObject.memoryResponseDto, { status: 200 })
        )
        .catch((err) => NextResponse.json(err.message, { status: 401 }));
}

export async function DELETE(req: NextRequest, context: Context) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }
    const memoryId = context.params.id;

    return axios
        .delete(`${process.env.API_DOMAIN}/memories/${memoryId}`, {
            headers: {
                Authorization: accessToken
            }
        })
        .then((res) => NextResponse.json(res.data, { status: 200 }))
        .catch((err) => NextResponse.json(err.message, { status: 401 }));
}
