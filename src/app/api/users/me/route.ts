import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import axios from 'axios';
import { getServerSession } from 'next-auth';

const secret = process.env.NEXTAUTH_SECRET;
export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
    }
    const response = await fetch(`${process.env.API_DOMAIN}/members/me`, {
        headers: {
            Authorization: accessToken
        }
    }).then((res) => {
        return res.json();
    });

    if (response?.responseObject) {
        return NextResponse.json(response.responseObject, { status: 200 });
    }

    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
}

export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return new Response('Authentication Error', { status: 401 });
    }

    const { memberName, memberPassword } = await req.json();

    const bodyData = {
        ...(memberName && { memberName }),
        ...(memberPassword && { memberPassword })
    };

    return axios
        .patch(`${process.env.API_DOMAIN}/members/me}`, bodyData, {
            headers: {
                Authorization: user.accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return NextResponse.json(res, { status: 200 });
        })
        .catch((err) => {
            const responseErr = {
                errorMessage: 'Bad Request',
                error: err
            };
            return new NextResponse(JSON.stringify(responseErr), { status: 400 });
        });
}
