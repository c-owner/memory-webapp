import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextResponse } from 'next/server';

export async function getUserForProfile(memberId: string) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    return axios
        .get(`${process.env.API_DOMAIN}/members/${memberId}`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.data.responseObject || {})
        .catch((err) => err);
}
