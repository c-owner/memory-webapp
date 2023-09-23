import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return new NextResponse('Bad Request', { status: 400 });
    }

    const response = await fetch(`${process.env.API_DOMAIN}/members/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ memberEmail: email, memberPassword: password })
    }).then((res) => {
        return res.json();
    });

    return new Response(JSON.stringify(response), { status: 200 });
}
