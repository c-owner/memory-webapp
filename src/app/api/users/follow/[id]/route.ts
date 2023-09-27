import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
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

    const { id: targetId } = context.params;

    if (!targetId) {
        return NextResponse.json('Bad Request', { status: 400 });
    }

    const data = axios
        .get(`${process.env.API_DOMAIN}/members/following/${targetId}`, {
            headers: {
                Authorization: accessToken
            }
        })
        .then((res) => {
            return res.data.responseObject || null;
        })
        .catch((err) => {
            return NextResponse.json(err.message, { status: 400 });
        });
    return NextResponse.json(data, { status: 200 });
}
