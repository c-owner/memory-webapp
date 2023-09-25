import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const newHeaders = req.headers;
    const response = await fetch(`${process.env.API_DOMAIN}/members/me`, {
        headers: newHeaders
    }).then((res) => {
        return res.json();
    });

    const { responseObject } = response;
    if (!responseObject) {
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
    }

    return NextResponse.json(response, { status: 200 });
}
