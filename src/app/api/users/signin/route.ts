import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return new NextResponse('Bad Request', { status: 400 });
    }

    const response = await fetch(`${process.env.API_DOMAIN}/members/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ memberEmail: email, memberPassword: password })
    })
        .then((res) => {
            const data = res.json();
            return data;
        })
        .catch((err) => {
            return err;
        });

    const { responseObject } = response;
    if (!responseObject) {
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
    }

    return new Response(JSON.stringify(response), { status: 200 });
}
