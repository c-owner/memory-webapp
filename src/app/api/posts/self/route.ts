import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    return axios
        .get(`${process.env.API_DOMAIN}/memories/self`, {
            headers: {
                Authorization: accessToken
            }
        })
        .then((res) => {
            const filterPosts = res.data.responseObject.content.filter(
                (post: { isDeleted: boolean }) => !post.isDeleted
            );
            return NextResponse.json(filterPosts || [], { status: 200 });
        })
        .catch((err) => NextResponse.json(err, { status: err.status }));
}
