import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import axios from 'axios';

type Context = {
    params: {
        keyword: string;
    };
};
export async function GET(req: NextRequest, context: Context) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
    }

    const { keyword } = context.params;

    return axios
        .get(`${process.env.API_DOMAIN}/members/${keyword}`, {
            headers: {
                Authorization: accessToken
            }
        })
        .then((res) => {
            return NextResponse.json([{ ...res.data.responseObject }], { status: res.status });
        })
        .catch((err) => {
            return NextResponse.json([err.message.toString()], { status: 200 });
        });
}
