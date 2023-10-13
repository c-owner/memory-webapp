import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
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
    const url = new URL(req.url || '');
    const searchParams = new URLSearchParams(url.search);
    const { id } = context.params;

    return axios
        .post(
            `${process.env.API_DOMAIN}/memories?size=${searchParams.get(
                'size'
            )}&page=${searchParams.get('page')}`,
            {},
            {
                headers: {
                    Authorization: accessToken
                }
            }
        )
        .then((res) => {
            const findPosts = res.data.responseObject.find(
                (post: { memberId: string }) => id === post.memberId.toString()
            );
            if (!findPosts) {
                return NextResponse.json([], { status: 200 });
            }

            const newPosts = findPosts.filter((post: { isDeleted: boolean }) => !post.isDeleted);
            return NextResponse.json(newPosts || [], { status: 200 });
        })
        .catch((err) => NextResponse.json(err, { status: err.status }));
}
