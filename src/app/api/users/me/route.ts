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
    const accessToken = session?.user?.accessToken;
    if (!accessToken) {
        return NextResponse.json('Not Authorized', { status: 401 });
    }

    const { memberName, memberPassword } = await req.json();

    if (!memberName && !memberPassword) {
        return NextResponse.json('Bad Request! Please check your api spec', { status: 400 });
    }

    return axios
        .patch(
            `${process.env.API_DOMAIN}/members/me`,
            {
                ...(memberName && { memberName }),
                ...(memberPassword && { memberPassword })
            },
            {
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((res) => {
            const resData = {
                message: res.data.successMessage,
                data: {
                    responseObject: res.data.responseObject
                },
                status: 200
            };

            return NextResponse.json(resData, { status: res.status });
        })
        .catch((err) => {
            const errData = {
                message: 'Something went wrong',
                data: {
                    responseObject: {}
                },
                status: err.response.status
            };
            return NextResponse.json(errData, { status: 200 });
        });
}
