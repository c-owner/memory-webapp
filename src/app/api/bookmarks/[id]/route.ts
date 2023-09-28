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

    const { id } = context.params;

    return axios
        .post(`${process.env.API_DOMAIN}/saved-memories/${id}`, null, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        .then((res) => {
            return NextResponse.json(res.data || [], { status: 200 });
        })
        .catch((err) => {
            return NextResponse.json(err.message, { status: err.status });
        });
}
