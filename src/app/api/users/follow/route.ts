import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    const data = axios
        .get(`${process.env.API_DOMAIN}/members/following`, {
            headers: {
                Authorization: accessToken
            }
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return NextResponse.json(err.message, { status: 400 });
        });
    return NextResponse.json(data, { status: 200 });
}
