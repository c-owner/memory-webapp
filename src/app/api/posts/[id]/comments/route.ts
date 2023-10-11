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
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }
        )
        .then((res) => {
            return NextResponse.json(res.data || {}, { status: 200 });
        })
        .catch((err) => {
            return NextResponse.json(
                { message: err.message, data: err.response.data },
                { status: err.status }
            );
        });
}

export async function DELETE(req: NextRequest, context: Context) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    const { id: memoryId } = context.params;
    const { commentId } = await req.json();

    return axios
        .delete(`${process.env.API_DOMAIN}/memories/${memoryId}/comments/${commentId}`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        .then((res) => {
            return NextResponse.json(res.data || {}, { status: 200 });
        })
        .catch((err) => {
            return NextResponse.json(
                { message: err.message, data: err.response.data },
                { status: err.status }
            );
        });
}

export async function PATCH(req: NextRequest, context: Context) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    const { commentId, content } = await req.json();
    const { id } = context.params;

    return axios
        .patch(
            `${process.env.API_DOMAIN}/memories/${id}/comments/${commentId}`,
            { content },
            {
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }
        )
        .then((res) => {
            return NextResponse.json(res.data || {}, { status: 200 });
        })
        .catch((err) => {
            return NextResponse.json(
                { message: err.message, data: err.response.data },
                { status: err.status }
            );
        });
}
